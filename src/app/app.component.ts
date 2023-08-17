import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showDropdown: boolean = false;
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'

  posts: any;

  constructor(private toast: NgToastService, private http: HttpClient) {  }
  title = 'api-angular';

  getPosts()
  {
    this.posts = this.http.get(this.ROOT_URL + '/posts')
  }

  showSuccess() {
    this.toast.warning({detail:"Warning",summary:"Miss something? ",duration:5000})
  }
}
