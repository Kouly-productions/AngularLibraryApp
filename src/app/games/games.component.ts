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
  
  gameData: any[] = [];
  displayedGames: any[] = [];
  fetchingGameCount: number = 0;
  firstHalfGames: any[] = [];
  secondHalfGames: any[] = [];

  readonly Game_API_ROOT_URL = 'https://rawg.io/api/games';
  readonly Game_API_KEY = '8bcdd82ce88745748f2b622d3e34c1ce';


  constructor(toastr: ToastrService, private apiService: ApiService, private dialogRef : MatDialog ) {
    super(toastr);
  }
    //Function for the data to be avialable from Movies to Pop-UP and making variables that we send to Pop-Up
    openDialog( gameId:string,gameName: string, gameRelease: string, gameDevelopers: Array<Array<object>>, gameGenre: Array<Array<object>>, gamePlaytime: string, gameDesc: string,gameRating:string,gameImage:string){
      console.log(gameId);
      let Genres="";
      let Developers="";
      for(let i=0;i<gameGenre.length;i++){
        if(Genres==""&&gameGenre.length!=1){
          Genres+=(Object(gameGenre[i]).name)+',';
        }else{
          Genres+=(Object(gameGenre[i]).name);
        }
      }
      for(let i=0;i<gameDevelopers.length;i++){
        if(Developers=="" && gameDevelopers.length!=1){
          Developers+=(Object(gameDevelopers[i]).name)+',';
        }else{
          Developers+=(Object(gameDevelopers[i]).name);
        }
      }
      this.dialogRef.open(PopUpComponent,{
        data:{
          id:gameId,
          title:'Title : '+gameName,
          release:'Release : '+gameRelease,
          director:'Developers : '+Developers,
          genre:'Genre : '+Genres,
          runtime:'Playtime : '+gamePlaytime,
          plot:'Description : '+gameDesc,
          rating:'Rating : '+gameRating,
          poster:gameImage
        }
      });
      
    }

    override ngOnInit(): void {
    // Setting dataIds to an array of movie IDs
    this.dataIds = ['200', '201', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '5679', '28', '216', '217'
    ,'218', '219'];

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

  override fetchData(gameId: string): void {

    this.fetchingGameCount++;

    // Fetch movie data from the API
    this.apiService.fetchGameData(this.Game_API_ROOT_URL, gameId, this.Game_API_KEY)
    .subscribe(
      data => {
        this.fetchingGameCount--;
        // Get the original index of the movie ID from dataIds array
        const originalIndex = this.dataIds.indexOf(gameId);
        data.originalIndex = originalIndex;
        console.log("Fetched Data ", data)
        // Add the fetched movie data to the displayedGames array
        this.displayedGames.push(data);
        // store the fetched movie data in GameData array
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