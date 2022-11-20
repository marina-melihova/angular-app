import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoursesStateFacade } from 'src/app/store';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements AfterViewInit {
  @Input() placeholder: string;

  @Output() search = new EventEmitter<string>();

  @ViewChild('searchForm') form: NgForm;
  query: string = '';

  constructor(private coursesStateFacade: CoursesStateFacade) {}

  ngAfterViewInit() {
    this.coursesStateFacade.isSearchingState$.subscribe((isSearchState) => {
      if (!isSearchState) {
        this.form.reset();
      }
    });
  }

  onFormSubmit() {
    this.search.emit(this.query);
  }
}
