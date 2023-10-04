import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private moviesList: any[] = [];
  private gamesList: any[] = [];
  constructor(private toastr: ToastrService) { 

  }


  addToMoviesList(id: string,Title:String,Release:String,Director:String,Genre:String,Runtime:String,Plot:String,Ratings:String, Poster: string): void {
    const exists = this.moviesList.some(movie => movie.id === id);

    if (!exists) {
    const movie = { id,Title,Release,Director,Genre,Runtime,Plot,Ratings, Poster };
    this.moviesList.push(movie);
    this.toastr.success('Added');
  }
  else{
    this.toastr.warning('Already in list');
  }
  console.log('Current moviesList:', this.moviesList);
}

    getMoviesList(): string[] {
        return this.moviesList;
    }

  addToGamesList(id: string,Title:String,Release:String,Developers:String,Genre:String,Playtime:String,Description:String,Ratings:String, gameImage: string): void {
    const exists = this.gamesList.some(game => game.id === id);

    if (!exists) {
      const game = { id,Title,Release,Developers,Genre,Playtime,Description,Ratings, gameImage };
      this.gamesList.push(game);
      console.log('Current gamesList:', this.gamesList);
      this.toastr.success('Added');
    }else{
      this.toastr.warning('Already in list');
    }
  }


  getGamesList(): string[] {
    return this.gamesList;
  }
}
