import { Component,OnInit, Input , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  //Variabler for the different data we get from Movies
   title;
   release;
   director;
   genre;
   runtime;
   plot;
   rating;
   poster;
   //Here we create a cunstructor for Pop-up so that we can the the variables from Movies and change the current variables values
  constructor(@Inject(MAT_DIALOG_DATA) public data : {title:string,release:string,director:string,genre:string,runtime:string,plot:string,rating:string,poster:string}) { 
    this.title = data.title;
    this.release = data.release;
    this.director = data.director;
    this.genre = data.genre;
    this.runtime = data.runtime;
    this.plot = data.plot;
    this.rating = data.rating;
    this.poster = data.poster;
  }

  ngOnInit(): void {
  }

}