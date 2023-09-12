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

  readonly OMDB_ROOT_URL = 'https://www.omdbapi.com';
  readonly OMDB_API_KEY = 'ac80372a';


  //Constructor to use the ToastrService and HttpClient
  constructor(toastr: ToastrService, private apiService: ApiService) {
    super(toastr);
  }

  override ngOnInit(): void {
    this.dataIds = ['tt15398776', 'tt6791350', 'tt8589698', 'tt5433140', 'tt9348554', 'tt6718170', 'tt2906216', 
    'tt5971474', 'tt10366206', 'tt4589218', 'tt5090568', 'tt0439572', 'tt1745960', 'tt13904644', 'tt0816692', 'tt0468569', 'tt1877830',
    'tt0120338', 'tt1517268'];

    this.loadData(4);
  }

  //clear displayed data
  override clearData(): void {
    this.displayedMovies = [];
  } 

  override loadData(count: number): void {
    let startIndex = (this.currentPage - 1) * count;
    let endIndex = startIndex + count;
    let slicedIds = this.dataIds.slice(startIndex, endIndex);

    this.displayedMovies = [];
    slicedIds.forEach(id => {
      this.fetchData(id);
    });
  }

  override fetchData(movieId: string): void {
    this.fetchingMovieCount++;
    this.apiService.fetchData(this.OMDB_ROOT_URL, movieId, this.OMDB_API_KEY)
    .subscribe(
      data => {
        this.fetchingMovieCount--;
        const originalIndex = this.dataIds.indexOf(movieId);
        data.originalIndex = originalIndex;
        console.log("Fetched Data ", data)
        this.displayedMovies.push(data);
        this.movieData.push(data);
        this.loadedIds.add(movieId);
        this.isAPIWorking = true;
        if(this.fetchingMovieCount === 0) {
          this.displayedMovies.sort((a, b) => a.originalIndex - b.originalIndex);
        }
        },
        error => {
          this.toastr.error('API is not working', 'ERROR');
        }
      );
  }
}