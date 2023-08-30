import { Component } from '@angular/core';

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

  //Variables to store the movie data
  movieId: string = '';
  movieTitle: string = '';
  moviePoster: string = '';
  movieData: any[] = [];

  //Constants to access the movies data
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

    this.loadData(5);
  }

  //Function to get the movie data from the API
  override fetchData(movieId: string): void {
      this.apiService.fetchData(this.OMDB_ROOT_URL, movieId, this.OMDB_API_KEY)
      .subscribe(
        data => {
          console.log("Fetched Data ", data)
          this.movieData.push(data);
          this.loadedIds.add(movieId);
          this.isAPIWorking = true;
        },
        error => {
          this.toastr.error('API is not working', 'ERROR');
        }
      );
    }
  }