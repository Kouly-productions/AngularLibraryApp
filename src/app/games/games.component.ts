import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { BaseComponent } from '../base/base.component';

export interface GameData {
  id: number;
  name: string;
  background_image: string;
  originalIndex?: number;
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent extends BaseComponent {
  
  gameData: any[] = [];
  displayedGames: any[] = [];
  fetchingGameCount: number = 0;

  constructor(toastr: ToastrService, private apiService: ApiService) {
    super(toastr);
  }

    override ngOnInit(): void {
    this.dataIds = ['200', '201', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '5679', '28'];
    this.loadData(4);
  }

  override clearData(): void {
    this.displayedGames = [];
  }

  isLastPage(): boolean {
    let maxPage = Math.ceil(this.dataIds.length / 4);
    return this.currentPage === maxPage;
  }

  override loadData(count: number): void {
    let startIndex = (this.currentPage - 1) * count;
    let endIndex = Math.min(startIndex + count, this.dataIds.length);
    let slicedIds = this.dataIds.slice(startIndex, endIndex);

    this.displayedGames = [];
    slicedIds.forEach(id => {
    this.fetchData(id);
    console.log("Sliced Ids")
    });
  }

  // Override the fetchData method to fetch game data from an API
  override fetchData(gameId: string): void {
    // Increase the count of fetch operations
    this.fetchingGameCount++;
    // Call the API service to fetch game data
    this.apiService.fetchGameData(gameId)
    .subscribe(
      data => {
        this.fetchingGameCount--;
        data.results.forEach((result: any) => {
          const originalIndex = this.dataIds.indexOf(gameId.toString());
          const game: GameData = {
            id: result.id,
            name: result.name,
            background_image: result.background_image,
            originalIndex: originalIndex
          };
          this.displayedGames.push(game);
          this.gameData.push(game);
        });
        if (this.fetchingGameCount === 0) {
          this.displayedGames.sort((a, b) => a.originalIndex - b.originalIndex);
        }
        this.loadedIds.add(gameId);
        this.isAPIWorking = true;
      },
      error => {
        this.toastr.error('API is not working', 'ERROR');
      }
    );
  }
}