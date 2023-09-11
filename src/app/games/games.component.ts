import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { BaseComponent } from '../base/base.component';

export interface GameData {
  id: number;
  name: string;
  background_image: string;
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent extends BaseComponent {
  //Variables to store the game data
  gameId: string = '';
  gameTitle: string = '';
  gamePoster: string = '';
  gameData: any[] = [];

  constructor(toastr: ToastrService, private apiService: ApiService) {
    super(toastr);
  }

  override ngOnInit(): void {
    this.dataIds = ['200', '201', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '5679', '28'];
    this.loadData(6);
  }

  override fetchData(gameId: string): void {
    // Check if gameId is already loaded
    if (this.loadedIds.has(gameId)) {
      return;
    }
    
    this.apiService.fetchGameData(gameId)
    .subscribe(
      data => {
        console.log("Fetched Data ", data);
        
        data.results.forEach((result: any) => {
          const game: GameData = {
            id: result.id,
            name: result.name,
            background_image: result.background_image,
          };
          
          // Check if game is already in gameData
          if (!this.gameData.some(g => g.id === game.id)) {
            this.gameData.push(game);
          }
        });
        
        this.loadedIds.add(gameId);
        this.isAPIWorking = true;
      },
      error => {
        console.log("Error ", error);
        this.toastr.error('API is not working', 'ERROR');
      }
    );
  }
}