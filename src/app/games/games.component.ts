import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  constructor(private toastr: ToastrService) {}
  AddedToList(): void {
    this.toastr.error('No database linked yet', 'ERROR');
  }
  InfoAboutMovie(): void {
    this.toastr.error('No API linked yet', 'ERROR');
  }
}