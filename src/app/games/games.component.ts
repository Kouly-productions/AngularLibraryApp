import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { BaseComponent } from '../base/base.component';
import { MatDialog } from '@angular/material/dialog'
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent extends BaseComponent {
  
  searchTerm: string;
  gameData: any[] = [];
  displayedGames: any[] = [];
  fetchingGameCount: number = 0;
  firstHalfGames: any[] = [];
  secondHalfGames: any[] = [];

  readonly OMDB_ROOT_URL = 'https://www.omdbapi.com';
  readonly OMDB_API_KEY = 'ac80372a';


  constructor(toastr: ToastrService, private apiService: ApiService, private dialogRef : MatDialog ) {
    super(toastr);
  }
    //Function for the data to be avialable from Movies to Pop-UP and making variables that we send to Pop-Up
      openDialog( gameId:string,gameName: string, gameRelease: string, gameDev: string, gameGenre: string, gamePlaytime: string, gameDesc: string,gameRating:string,gameImage:string){
        console.log(gameId);
        this.dialogRef.open(PopUpComponent,{
          data:{
            id:gameId,
            title:'Title : '+gameName,
            release:'Release : '+gameRelease,
            director:'Developers : '+gameDev,
            genre:'Genre : '+gameGenre,
            runtime:'Playtime : '+gamePlaytime,
            plot:'Description : '+gameDesc,
            rating:'Rating : '+(Object(gameRating[0]).Value),
            poster:gameImage
          }
        });        
      }
      
    override ngOnInit(): void {
    // Setting dataIds to an array of movie IDs
    this.dataIds = ['tt2011970', 'tt3554580', 'tt2620204', 'tt1149396', 'tt0433664', 'tt3359066', 'tt5691474', 'tt4214834'];

    this.loadData(8);
  }

  override clearData(): void {
    this.displayedGames = [];
  }

  // load and display movies, by calculating the starting and ending index
  override loadData(count: number): void {

    let startIndex = (this.currentPage - 1) * count;
    let endIndex = startIndex + count;
    // Slice the dataIds array to only 4 movies on each page
    let slicedIds = this.dataIds.slice(startIndex, endIndex);

    // Empty array
    this.displayedGames = [];

    // Loop through each sliced ID and fetch its data
    slicedIds.forEach(id => {
    this.fetchData(id);
    console.log("Sliced Ids")
    });
  }

  // Check if the current page is the last page
  isLastPage(): boolean {
    // Calculate the maximum page number
    let maxPage = Math.ceil(this.dataIds.length / 8);
    return this.currentPage === maxPage;
  }

  searchGame(): void {
    this.apiService.searchGame(this.searchTerm).subscribe(
    (data: any) => {
      this.dataIds = data.Search.map((game: any) => game.imdbID);
      this.clearData();
      this.loadData(8);
    },
    (error: any) => {
      this.toastr.error('API is not working', 'ERROR');
      }
    );
  }

  override fetchData(gameId: string): void {

    this.fetchingGameCount++;

    // Fetch game data from the API
    this.apiService.fetchGameData(this.OMDB_ROOT_URL, gameId, this.OMDB_API_KEY)
    .subscribe(
      data => {
        this.fetchingGameCount--;
        // Get the original index of the movie ID from dataIds array
        const originalIndex = this.dataIds.indexOf(gameId);
        data.originalIndex = originalIndex;
        console.log("Fetched Data ", data)
        // Add the fetched game data to the displayedGames array
        this.displayedGames.push(data);
        // store the fetched game data in GameData array
        this.gameData.push(data);
        // Mark the movie ID as loaded
        this.loadedIds.add(gameId);
        // Setting the API status to true (Is working)
        this.isAPIWorking = true;
        // Sort displayedGames based on original index if all fetching is done
        if (this.fetchingGameCount === 0) {
          this.displayedGames.sort((a, b) => a.originalIndex - b.originalIndex);
          const halfLength = Math.ceil(this.displayedGames.length / 1);
          this.firstHalfGames = this.displayedGames.splice(0, halfLength);
          this.secondHalfGames = this.displayedGames.splice(halfLength);
        }
      },
      // If the API returns an error, it will go through error below
      error => {
        this.toastr.error('API is not working', 'ERROR');
      }
    )
  }
}