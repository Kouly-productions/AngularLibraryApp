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


  addToMoviesList(id: string, Poster: string): void {
    const exists = this.moviesList.some(movie => movie.id === id);

    if (!exists) {
    const movie = { id, Poster };
    this.moviesList.push(movie);
    this.toastr.success('Added');
  }
  else{
    console.log('Already in list');
    this.toastr.warning('Already in list');
  }
  console.log('Current moviesList:', this.moviesList);
}

    getMoviesList(): string[] {
        return this.moviesList;
    }

  addToGamesList(id: string, gameImage: string): void {
    const exists = this.gamesList.some(game => game.id === id);

    if (!exists) {
      const game = { id, gameImage };
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
