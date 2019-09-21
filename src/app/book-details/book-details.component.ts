import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'lb-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  @Input() book: Book;
  @Output() showListEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getRating(num: number) {
    return new Array(num);
  }

  showBookList() {
    this.showListEvent.emit();
  }

}
