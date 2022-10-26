import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  filter,
  forkJoin,
  map,
  Observable,
  Subject,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  searchTermByCharacters = new Subject<string>();
  charactersResults$: Observable<any>;
  planetAndCharactersResults$: Observable<any>;
  isLoading: boolean = false;
  private destroyStream = new Subject<void>();

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initLoadingState();
    this.initCharacterEvents();
  }

  changeCharactersInput(element: KeyboardEvent): void {
    const inputValue: string = (element.target as HTMLInputElement).value;
    this.searchTermByCharacters.next(inputValue);
  }

  initCharacterEvents(): void {
    this.charactersResults$ = this.searchTermByCharacters.pipe(
      debounceTime(500),
      map((query: string) => query.trim()),
      filter((query: string) => query.length > 2),
      distinctUntilChanged(),
      switchMap((query: string) => this.mockDataService.getCharacters(query))
    );
  }

  loadCharactersAndPlanet(): void {
    this.planetAndCharactersResults$ = forkJoin([
      this.mockDataService.getCharacters(),
      this.mockDataService.getPlanets(),
    ]).pipe(map(([characters, planets]) => [...characters, ...planets]));
  }

  initLoadingState(): void {
    combineLatest([
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader(),
    ])
      .pipe(takeUntil(this.destroyStream))
      .subscribe((loaders) => {
        console.log('loaders', loaders);
        this.isLoading = this.areSomeValueTrue(loaders);
        console.log('isLoading', this.isLoading);
      });
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
  }

  areSomeValueTrue(elements: boolean[]): boolean {
    return elements.some((el) => el);
  }
}
