import { Component } from '@angular/core';
import { ListService } from '../list.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MyListComponent {
   moviesList: any[] = [];
   gamesList: any[] = [];

  constructor(private listService: ListService) { 
    this.moviesList = this.listService.getMoviesList();
    this.gamesList = this.listService.getGamesList();
  }

  deleteMovie(index: number): void {
    this.moviesList.splice(index, 1);
  }      

  deleteGame(index: number): void {
    this.gamesList.splice(index, 1);
  }      
}
