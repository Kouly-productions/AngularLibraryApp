import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  constructor(private toastr: ToastrService) {}
  AddedToList(): void {
    this.toastr.error('No database linked yet', 'ERROR');
  }
  InfoAboutMovie(): void {
    this.toastr.error('No API linked yet', 'ERROR');
  }
}