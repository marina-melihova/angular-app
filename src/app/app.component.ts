import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  filter,
  forkJoin,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
  debounceTime,
  distinctUntilChanged,
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
  subscriptions = new Subscription();

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
      map((query: string) => (query ? query.trim() : '')),
      filter((query: string) => query.length > 2),
      debounceTime(500),
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
    this.subscriptions.add(
      combineLatest([
        this.mockDataService.getCharactersLoader(),
        this.mockDataService.getPlanetLoader(),
      ]).subscribe((loaders) => {
        console.log('loaders', loaders);
        this.isLoading = this.areSomeValueTrue(loaders);
        console.log('isLoading', this.isLoading);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  areSomeValueTrue(elements: boolean[]): boolean {
    return elements.some((el) => el);
  }
}
