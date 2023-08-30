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
  //Variables to store the game data
  gameId: string = '';
  gameTitle: string = '';
  gamePoster: string = '';
  gameData: any[] = [];

  //Constants to access the games data
  readonly API_ROOT_URL = '/rawg-api';
  readonly API_KEY = '8bcdd82ce88745748f2b622d3e34c1ce';

  constructor(toastr: ToastrService, private apiService: ApiService) {
    super(toastr);
  }

  override ngOnInit(): void {
    console.log("ngOnInit called");
    this.dataIds = ['200', '201', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215',];
    this.loadData(5);
  }

      //Function to get the game data from the API
    override fetchData(gameId: string): void {
      this.apiService.fetchGameData(gameId, this.API_KEY)
      .subscribe(
        data => {
          console.log("Fetched Data ", data)
          this.gameData.push(data);
          this.loadedIds.add(gameId);
          this.isAPIWorking = true;
        },
        error => {
          console.log("Error ", error)
          this.toastr.error('API is not working', 'ERROR');
        }
      );
    }
  }