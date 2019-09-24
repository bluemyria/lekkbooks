import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'lb-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.bs.getAll().subscribe( res => this.books = res);
  }

}
