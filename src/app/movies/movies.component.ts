import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

//Required to show the notifications we use
import { NgToastService } from 'ng-angular-popup';

//Required to run animations in Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Makes us able to make notifications such as errors and success messages
import { ToastrModule, ToastrService } from 'ngx-toastr';

//Make us able to use http requests 
import { Observable, fromEvent } from 'rxjs';

import { ApiService } from '../api.service';

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

  private scrollSubscription: any;

  //Constants to access the movies data
  readonly OMDB_ROOT_URL = 'https://www.omdbapi.com';
  readonly OMDB_API_KEY = 'ac80372a';

  //List of known IMDB IDs to fetch details. (Hardcoded, change this)
  readonly knowIMDBIds = ['tt15398776', 'tt6791350', 'tt8589698', 'tt5433140', 'tt9348554', 'tt6718170', 'tt2906216', 
  'tt5971474', 'tt10366206', 'tt4589218', 'tt5090568', 'tt0439572', 'tt1745960', 'tt13904644', 'tt0816692', 'tt0468569', 'tt1877830',
  'tt0120338', 'tt1517268']


  //Constructor to use the ToastrService and HttpClient
  constructor(private toastr: ToastrService, private apiService: ApiService) {}

  //Function to get the movie data from the API
  getMovieData() {
    if(this.movieId) {
      //Using the api service to fetch data
      this.apiService.fetchData(this.OMDB_ROOT_URL, this.movieId, this.OMDB_API_KEY)
      .subscribe(
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

    const shuffledIds = [...this.knowIMDBIds].sort(() => Math.random() - 0.5);

    for (let i = 0; i < 5; i++) {
      this.movieId = shuffledIds[i];
      this.getMovieData();
    }
    /*
    //Loop through the list of known IMDB IDs
    for (let i = 0; i < 5 && i < this.knowIMDBIds.length; i++) {
      this.movieId = this.knowIMDBIds[i];
      this.getMovieData();
    }
    */
  }

  ngAfterViewInit() {
    const middleElement = document.querySelector('.middle');
    if(middleElement) {
    this.scrollSubscription = fromEvent(middleElement, 'scroll').subscribe(() => this.onScroll());
    }
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

  lastLoadedIndex = 5;

  onScroll() {
    const middleElement = document.querySelector('.middle');
    if (middleElement && (middleElement.scrollHeight - middleElement.scrollTop) <= middleElement.clientHeight) {
      for (let i = this.lastLoadedIndex; i < this.lastLoadedIndex + 4 && i < this.knowIMDBIds.length; i++) {
        this.movieId = this.knowIMDBIds[i];
        this.getMovieData();
      }
      this.lastLoadedIndex += 4;
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