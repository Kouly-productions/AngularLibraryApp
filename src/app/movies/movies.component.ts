import { Component, OnInit } from '@angular/core';

//Makes us able to make notifications such as errors and success messages
import { ToastrService } from 'ngx-toastr';

//Make us able to use http requests 
import { fromEvent } from 'rxjs';

//Enables us to use API
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {

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
  shuffledKnownIMDBIds: string[] = [];
  loadedMoviesIds: Set<string> = new Set();
  lastLoadedIndex = 5;

  //List of known IMDB IDs to fetch details. (Hardcoded, change this)
  readonly knowIMDBIds = ['tt15398776', 'tt6791350', 'tt8589698', 'tt5433140', 'tt9348554', 'tt6718170', 'tt2906216', 
  'tt5971474', 'tt10366206', 'tt4589218', 'tt5090568', 'tt0439572', 'tt1745960', 'tt13904644', 'tt0816692', 'tt0468569', 'tt1877830',
  'tt0120338', 'tt1517268']


  //Constructor to use the ToastrService and HttpClient
  constructor(private toastr: ToastrService, private apiService: ApiService) {}

  ngOnInit(): void {

    this.shuffledKnownIMDBIds = this.shuffleArray([...this.knowIMDBIds]);
    this.loadMovies(5);
  }

  loadMovies(count: number): void {
    for (let i = this.lastLoadedIndex; i < this.lastLoadedIndex + count; i++) {
      this.fetchMovieData(this.shuffledKnownIMDBIds[i]);
    }
    this.lastLoadedIndex += count;
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  //Function to get the movie data from the API
  fetchMovieData(movieId: string): void {
    if (movieId) {
      if(!this.loadedMoviesIds.has(movieId)) {
      this.apiService.fetchData(this.OMDB_ROOT_URL, movieId, this.OMDB_API_KEY)
      .subscribe(
        data => {
          this.movieData.push(data);
          this.loadedMoviesIds.add(movieId);
          this.isAPIWorking = true;
        },
        error => {
          this.toastr.error('API is not working', 'ERROR');
        }
      );
      }
    } else {
      this.toastr.error('No movie IDs to be loaded', 'ERROR');
    }
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

  onScroll() {
    const middleElement = document.querySelector('.middle');
    if (middleElement && (middleElement.scrollHeight - middleElement.scrollTop) <= middleElement.clientHeight) {
      let newMoviesLoaded = 0;
      for (let i = this.lastLoadedIndex; i < this.lastLoadedIndex + 5 && i < this.shuffledKnownIMDBIds.length; i++) {
        if(newMoviesLoaded >= 5) {
          break;
        }
        if(!this.loadedMoviesIds.has(this.shuffledKnownIMDBIds[i])) {
        this.fetchMovieData(this.shuffledKnownIMDBIds[i]);
        newMoviesLoaded++;
        }
      }
      this.lastLoadedIndex += newMoviesLoaded;
          if(this.lastLoadedIndex >= this.shuffledKnownIMDBIds.length){
            this.toastr.info('All movies loaded!', 'INFO');
      }
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