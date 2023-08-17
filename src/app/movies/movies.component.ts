import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
//Make us able to use http requests 
import {HttpClient} from '@angular/common/http';
import { Post } from './moviesPost';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
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