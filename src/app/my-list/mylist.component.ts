import { Component } from '@angular/core';
import { ListService } from '../list.service';
import { ToastrService } from 'ngx-toastr';

import { MatDialog } from '@angular/material/dialog'
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MyListComponent {
   moviesList: any[] = [];
   gamesList: any[] = [];

  constructor(private listService: ListService, private toastr: ToastrService,private dialogRef : MatDialog) { 
    this.moviesList = this.listService.getMoviesList();
    this.gamesList = this.listService.getGamesList();
  }

  deleteMovie(index: number): void {
    this.moviesList.splice(index, 1);
    this.toastr.success('Deleted');
  }      

  deleteGame(index: number): void {
    this.gamesList.splice(index, 1);
    this.toastr.success('Deleted');
  }
  openDialog(id:string){
    for(let movie of this.moviesList) {
      if(movie.id==id){
        const dialogRef = this.dialogRef.open(PopUpComponent,{
          data:{
            id:movie.id,
            title:'Title : '+movie.Title,
            release:'Release : '+movie.Release,
            director:'Director : '+movie.Director,
            genre:'Genre : '+movie.Genre,
            runtime:'Runtime : '+movie.Runtime,
            plot:'Plot : '+movie.Plot,
            rating:'Rating : '+movie.Ratings,
            poster:movie.Poster
          }
        });
      }else{
        break   
      }
    };
    for(let game of this.gamesList){
          if(game.id==id){
            const dialogRef = this.dialogRef.open(PopUpComponent,{
              data:{
                id:game.id,
                title:'Title : '+game.Title,
                release:'Release : '+game.Release,
                director:'Developers : '+game.Developers,
                genre:'Genre : '+game.Genre,
                runtime:'Playtime : '+game.Playtime,
                plot:'Description : '+game.Description,
                rating:'Rating : '+game.Ratings,
                poster:game.gameImage
              }
            }); 
          }
        }
      }
  
}
