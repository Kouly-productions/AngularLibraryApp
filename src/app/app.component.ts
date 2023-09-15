import { Component, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import {HttpClient} from '@angular/common/http';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})


export class AppComponent {
  showDropdown: boolean = false;
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'

  posts: any;

  constructor(private toast: NgToastService, private http: HttpClient, private _eref: ElementRef) {  }
  title = 'api-angular';

  @ViewChild('dropdown', {static: false }) dropdown: ElementRef;
  @ViewChild('dropdownButton', {static: false }) dropdownButton: ElementRef;

  onClick(event: Event) {
    if (this.dropdown && 
        this.dropdown && !this.dropdown.nativeElement.contains(event.target) &&
        this.dropdownButton && !this.dropdownButton.nativeElement.contains(event.target)) {
      this.showDropdown = false;
   }
  }

  getPosts()
  {
    this.posts = this.http.get(this.ROOT_URL + '/posts')
  }

  showSuccess() {
    this.toast.warning({detail:"Warning",summary:"Miss something? ",duration:5000})
  }
}
