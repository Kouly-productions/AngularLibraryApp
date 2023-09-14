import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent extends BaseComponent {
  
  gameData: any[] = [];
  displayedGames: any[] = [];
  fetchingGameCount: number = 0;

  readonly Game_API_ROOT_URL = 'https://rawg.io/api/games';
  readonly Game_API_KEY = '8bcdd82ce88745748f2b622d3e34c1ce';


  constructor(toastr: ToastrService, private apiService: ApiService) {
    super(toastr);
  }

    override ngOnInit(): void {
    // Setting dataIds to an array of movie IDs
    this.dataIds = ['200', '201', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '5679', '28'];

    this.loadData(4);
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
    let maxPage = Math.ceil(this.dataIds.length / 4);
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
        }
      },
      // If the API returns an error, it will go through error below
      error => {
        this.toastr.error('API is not working', 'ERROR');
      }
    )
  }
}