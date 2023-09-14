import { Component, OnInit } from '@angular/core';

//Makes us able to make notifications such as errors and success messages
import { ToastrService } from 'ngx-toastr';

//Enables us to use API
import { ApiService } from '../api.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent extends BaseComponent {

  movieId: string = '';
  movieTitle: string = '';
  moviePoster: string = '';
  movieData: any[] = [];
  displayedMovies: any[] = [];
  fetchingMovieCount: number = 0;

  //API URL and API Key
  readonly OMDB_ROOT_URL = 'https://www.omdbapi.com';
  readonly OMDB_API_KEY = 'ac80372a';


  //Constructor to use the ToastrService and HttpClient
  constructor(toastr: ToastrService, private apiService: ApiService) {
    super(toastr);
  }

  override ngOnInit(): void {
    // Setting dataIds to an array of movie IDs
    this.dataIds = ['tt15398776', 'tt6791350', 'tt8589698', 'tt5433140', 'tt9348554', 'tt6718170', 'tt2906216', 
    'tt5971474', 'tt10366206', 'tt4589218', 'tt5090568', 'tt0439572', 'tt1745960', 'tt13904644', 'tt0816692', 'tt0468569', 'tt1877830',
    'tt0120338', 'tt1517268'];

    this.loadData(4);
  }

  // clear displayed data
  override clearData(): void {
    this.displayedMovies = [];
  } 

  // load and display movies, by calculating the starting and ending index
  override loadData(count: number): void {
    let startIndex = (this.currentPage - 1) * count;
    let endIndex = startIndex + count;
    // Slice the dataIds array to only 4 movies on each page
    let slicedIds = this.dataIds.slice(startIndex, endIndex);

    // Empty array
    this.displayedMovies = [];

    // Loop through each sliced ID and fetch its data
    slicedIds.forEach(id => {
      this.fetchData(id);
      console.log("Sliced Ids ")
    });
  }

  // Check if the current page is the last page
  isLastPage(): boolean {
    // Calculate the maximum page number
    let maxPage = Math.ceil(this.dataIds.length / 4);
    return this.currentPage === maxPage;
  }

  // override the fetchData method to fetch movie data from movie API
  override fetchData(movieId: string): void {
    this.fetchingMovieCount++;
    // Fetch movie data from the API
    this.apiService.fetchData(this.OMDB_ROOT_URL, movieId, this.OMDB_API_KEY)
    .subscribe(
      // If the API returns data, it will go through data below
      data => {
        this.fetchingMovieCount--;
        // Get the original index of the movie ID from dataIds array
        const originalIndex = this.dataIds.indexOf(movieId);
        data.originalIndex = originalIndex;
        console.log("Fetched Data ", data)
        // Add the fetched movie data to the displayedMovies array
        this.displayedMovies.push(data);
        // store the fetched movie data in movieData array
        this.movieData.push(data);
        // Mark the movie ID as loaded
        this.loadedIds.add(movieId);
        // Setting the API status to true (Is working)
        this.isAPIWorking = true;
        // Sort displayedMovies based on original index if all fetching is done
        if(this.fetchingMovieCount === 0) {
          this.displayedMovies.sort((a, b) => a.originalIndex - b.originalIndex);
          }
        },
        // If the API returns an error, it will go through error below
        error => {
          // Display an error message
          this.toastr.error('API is not working', 'ERROR');
        }
      );
  }
}