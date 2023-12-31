import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';  // adjust the path to match your structure
import { MoviesComponent } from './movies/movies.component';
import { GamesComponent } from './games/games.component';
import { BooksComponent } from './books/books.component';
import { ComicsComponent } from './comics/comics.component';
import { MyListComponent } from './my-list/my-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'games', component: GamesComponent },
  { path: 'books', component: BooksComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'mylist', component: MyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }