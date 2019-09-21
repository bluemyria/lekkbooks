import { Component } from '@angular/core';
import { Book } from './shared/book';

type ViewState = 'list'|'details';

@Component({
  selector: 'lb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lekkbooks';
  book: Book;
  viewState: ViewState = 'list';

  showList() {
    this.viewState = 'list';
  }
  showDetails(book: Book) {
    this.book = book;
    this.viewState = 'details';
    // console.log(book);
  }
}
