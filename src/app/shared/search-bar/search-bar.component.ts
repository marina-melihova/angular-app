import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() placeholder: string;
  @Output() search = new EventEmitter<string>();
  query: string = '';

  onFormSubmit() {
    this.search.emit(this.query);
  }
}
