import { Component, OnInit, Input , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})

export class PopUpComponent implements OnInit {
  @Output() addToList = new EventEmitter<string>();
  //Variabler for the different data we get from Movies
   id; 
   title;
   release;
   director;
   genre;
   runtime;
   plot;
   rating;
   poster;
   //Here we create a cunstructor for Pop-up so that we can the the variables from Movies and change the current variables values
  constructor(@Inject(MAT_DIALOG_DATA) public data : {id:string,title:string,release:string,director:string,genre:string,runtime:string,plot:string,rating:string,poster:string}) { 
    this.id= data.id;
    this.title = data.title;
    this.release = data.release;
    this.director = data.director;
    this.genre = data.genre;
    this.runtime = data.runtime;
    this.plot = data.plot;
    this.rating = data.rating;
    this.poster = data.poster;
  }

  addToMyList(){
    this.addToList.emit(this.id);
  }

  ngOnInit(): void {
  }

}