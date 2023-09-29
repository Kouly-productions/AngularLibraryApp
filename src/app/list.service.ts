import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private moviesList: any[] = [];
  private gamesList: any[] = [];

  addToMoviesList(id: string, Poster: string): void {
    const movie = { id, Poster };
    this.moviesList.push(movie);
    console.log('Current moviesList:', this.moviesList);
  }

  addToGamesList(id: string, gameImage: string): void {
    const game = { id, gameImage };
    this.gamesList.push(game);
    console.log('Current gamesList:', this.gamesList);
  }

  getMoviesList(): string[] {
    return this.moviesList;
  }

  getGamesList(): string[] {
    return this.gamesList;
  }
}
