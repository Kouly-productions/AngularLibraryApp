import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

//Required to show the notifications we use
import { NgToastService } from 'ng-angular-popup';

//Required to run animations in Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Makes us able to make notifications such as errors and success messages
import { ToastrModule, ToastrService } from 'ngx-toastr';

//Make us able to use http requests 
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
  //Variable to check if the database is connected
  isDatabaseConnected: boolean = false;

  //Variable to check if the API is working
  isAPIWorking: boolean = false;

  //Variables to store the movie data
  movieId: string = '';
  movieTitle: string = '';
  moviePoster: string = '';

  //Array to store the movie data
  movieData: any[] = [];

  //Constants to access the movies data
  readonly OMDB_ROOT_URL = 'https://www.omdbapi.com';
  readonly OMDB_API_KEY = 'ac80372a';

  //List of known IMDB IDs to fetch details. (Hardcoded, change this)
  readonly knowIMDBIds = ['tt15398776', 'tt6791350', 'tt8589698', 'tt9603212']


  //Constructor to use the ToastrService and HttpClient
  constructor(private toastr: ToastrService, private http: HttpClient) {}

  //Function to get the movie data from the API
  getMovieData() {
    if(this.movieId) {
      const url = `${this.OMDB_ROOT_URL}?i=${this.movieId}&apikey=${this.OMDB_API_KEY}`;
      //Make a get request to the API
      this.http.get(url).subscribe(
        (data: any) => {
          //On success, push the data to the movieData array
          this.movieData.push(data);
          this.isAPIWorking = true;
        },
        error => {
          //On error, show error message
          this.toastr.error('Could not find movie data', 'ERROR');
        }
      );
    } else {
      //If no IMDB ID is found, show error message
      this.toastr.error('No IMDB ID found', 'ERROR');
    }
  }

  ngOnInit(): void {
    // Reset the movieData array
    this.movieData = [];

    //Loop through the list of known IMDB IDs
    for (let id of this.knowIMDBIds) {
      this.movieId = id;
      this.getMovieData();
    }
  }


  AddedToList(): void {
    if(!this.isDatabaseConnected) {
      this.toastr.error('No database linked yet', 'ERROR');
    } else {
      this.toastr.success('Sent to My list', 'SUCCESS');
    }
  }

  InfoAboutMovie(): void {
    if(!this.isAPIWorking) {
    this.toastr.error('No API linked yet', 'ERROR');
    } else {
      this.toastr.success('API is working', 'SUCCESS');
    }
  }
}