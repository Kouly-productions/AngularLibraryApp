import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  isDatabaseConnected: boolean = false;

  constructor(private toastr: ToastrService) {}

  AddedToList(): void {
    if(!this.isDatabaseConnected) {
      this.toastr.error('No database linked yet', 'ERROR');
    } else {
      this.toastr.success('Sent to My list', 'SUCCESS');
    }
  }

  InfoAboutMovie(): void {
    this.toastr.error('No API linked yet', 'ERROR');
  }

  async APIMoviehandler() {
    try {
      const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=ac80372a');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
