import { Component, OnInit } from '@angular/core';

//Makes us able to make notifications such as errors and success messages
import { ToastrService } from 'ngx-toastr';

//Enables us to use API
import { ApiService } from '../api.service';
import { BaseComponent } from '../base/base.component';

import { MatDialog } from '@angular/material/dialog'
import { PopUpComponent } from '../pop-up/pop-up.component';
import { ListService } from '../list.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent extends BaseComponent {

  searchTerm: string;
  movieData: any[] = [];
  displayedMovies: any[] = [];
  fetchingMovieCount: number = 0;
  firstHalfMovies: any[] = [];
  secondHalfMovies: any[] = [];

  //API URL and API Key
  readonly OMDB_ROOT_URL = 'https://www.omdbapi.com';
  readonly OMDB_API_KEY = 'ac80372a';


  //Constructor to use the ToastrService and HttpClient
  constructor(toastr: ToastrService, private apiService: ApiService , private dialogRef : MatDialog, private listService: ListService) {
    super(toastr);
  }
  //Function for the data to be avialable from Movies to Pop-UP and making variables that we send to Pop-Up
  openDialog( movieId:string,movieTitle: string, movieRelease: string, movieDirector: string, movieGenre: string, movieRuntime: string, moviePlot: string,movieRatings:Array<Array<object>>,moviePoster:string){
    console.log(movieId);
    const dialogRef = this.dialogRef.open(PopUpComponent,{
      data:{
        id:movieId,
        title:'Title : '+movieTitle,
        release:'Release : '+movieRelease,
        director:'Director : '+movieDirector,
        genre:'Genre : '+movieGenre,
        runtime:'Runtime : '+movieRuntime,
        plot:'Plot : '+moviePlot,
        rating:'Rating : '+(Object(movieRatings[0]).Value),
        poster:moviePoster
      }
    });
    //Listen to emitter from pop-up
    const addToListSubscription = dialogRef.componentInstance.addToList.subscribe((id:string)=>{
      //Send IDs to list.service.ts
      this.listService.addToMoviesList(id, moviePoster);
      console.log('Added to list, current list is:', this.listService.getMoviesList());
      this.toastr.success('Movie added to list', 'Added');
    });

    //Listens to when the dialog is closed
    dialogRef.afterClosed().subscribe(()=>{
      //Stops listening for the emitter, because you can't add to list while the dialog is closed
      addToListSubscription.unsubscribe();
    });
  }



  resetData(): void{
    this.currentPage=1;
    this.isSearching=false;
    this.clearData();
    this.loadData(8);
    (document.getElementById("search") as HTMLInputElement).value="";
  }

  searchMovie(): void {
    this.currentPage=1;
    this.isSearching=true;
    (document.getElementById("search") as HTMLInputElement).value="";
      this.apiService.searchMovie(this.searchTerm).subscribe(
        (data: any) => {
          this.searchDataId = data.Search.map((movie: any) => movie.imdbID);
          this.clearData();
          this.currentPage = 1;
      this.loadData(8);
        }
      );
  }

  override ngOnInit(): void {
    // Setting dataIds to an array of movie IDs
    this.dataIds = ['tt15398776', 'tt6791350', 'tt8589698', 'tt5433140', 'tt9348554', 'tt6718170', 'tt2906216', 
    'tt5971474', 'tt10366206', 'tt4589218', 'tt5090568', 'tt0439572', 'tt1745960', 'tt13904644', 'tt0816692', 'tt0468569', 'tt1877830',
    'tt0120338', 'tt1517268', 'tt17024450', 'tt0439572', 'tt9362930', 'tt9224104', 'tt0816692'];
    this.searchDataId=[];

    this.loadData(8);
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
    let slicedIds=[''];
    if(this.isSearching==false){
       slicedIds = this.dataIds.slice(startIndex, endIndex);
    }else{
      slicedIds = this.searchDataId.slice(startIndex,endIndex);
    }


    // Empty array
    this.displayedMovies = [];

    // Loop through each sliced ID and fetch its data
    slicedIds.forEach(id => {
      this.fetchData(id);
      console.log("Sliced Ids")
    });
  }


  // Check if the current page is the last page
  isLastPage(): boolean {
    // Calculate the maximum page number
    let maxPage;
    if(this.isSearching==false){
      maxPage = Math.ceil(this.dataIds.length / 8);
    }else{
      maxPage = Math.ceil(this.searchDataId.length/8);
    }

    return this.currentPage === maxPage;
  }

  // override the fetchData method to fetch movie data from movie API
  override fetchData(movieId: string): void {
    this.fetchingMovieCount++;
    // Fetch movie data from the API
    this.apiService.fetchMovieData(this.OMDB_ROOT_URL, movieId, this.OMDB_API_KEY)
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
          if (this.fetchingMovieCount === 0) {
            this.displayedMovies.sort((a, b) => a.originalIndex - b.originalIndex);
            const halfLength = Math.ceil(this.displayedMovies.length / 1);
            this.firstHalfMovies = this.displayedMovies.slice(0, halfLength);
            this.secondHalfMovies = this.displayedMovies.slice(halfLength);
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
