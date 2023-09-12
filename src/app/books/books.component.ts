import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import { Post } from './booksPost';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  isDatabaseConnected: boolean = false;
  movieTitle: string = '';
  moviePoster: string = '';
  movieData: any[] = [];

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'

  posts: Observable<Post[]>;

  constructor(private toastr: ToastrService, private http: HttpClient) {}
  title = 'api-angular';
  getPosts()
  {
    this.posts = this.http.get<Post[]>(this.ROOT_URL + '/posts')
  }

  ngOnInit(): void {
    //this.APIMovieCaller(); //Call API as soon the user goes to the Movie component
    this.getPosts();
  }

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
}