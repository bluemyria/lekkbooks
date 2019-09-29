import { Component, OnInit, Output, EventEmitter, ViewChild, Input, OnChanges } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { BookFactory } from '../shared/book-factory';
import { Book, Thumbnail } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'lb-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnChanges {
  @Input() book: Book;
  @Input() editing = false;

  bookForm: FormGroup;

  @Output() submitBook = new EventEmitter<Book>();

  constructor(private fb: FormBuilder) { }

  ngOnChanges() {
    this.initForm();
    this.setFormValues(this.book);
  }

  ngOnInit() {
   this.initForm();
  }

  private setFormValues(book: Book) {
    this.bookForm.patchValue(book);
    this.bookForm.setControl(
      'authors',
      this.buildAuthorsArray(book.authors)
    );
    this.bookForm.setControl(
      'thumbnails',
      this.buildThumbnailsArray(book.thumbnails)
    );
  }

  submitForm() {
    const formValue = this.bookForm.value;
    const authors = formValue.authors.filter(author => author);
    const thumbnails = formValue.thumbnails.filter(thumbnail => thumbnail.url);

    const isbn = this.editing ? this.book.isbn : formValue.isbn;

    const newBook: Book = {
      ...formValue,
      isbn,
      authors,
      thumbnails
    };

    this.submitBook.emit(newBook);

    this.bookForm.reset();
  }

  private initForm() {
    if (this.bookForm) {
      return;
    }

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: [{value: '', disabled: this.editing}, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([
        {title: '', url: ''}
      ]),
      published: []
    });
  }

  private buildAuthorsArray(values: string[]): FormArray {
    return this.fb.array(values, Validators.required);
  }

  private buildThumbnailsArray(values: Thumbnail[]): FormArray {
    return this.fb.array(
      values.map(t => this.fb.group(t))
    );
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }

  addAuthorControl() {
    this.authors.push(this.fb.control(''));
  }

  addThumbnailControl() {
    this.thumbnails.push(
      this.fb.group({url: '', title: ''})
    );
  }
}
