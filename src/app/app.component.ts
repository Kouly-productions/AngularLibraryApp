import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = "Something cool";
  favoriteAnimal: string = "Dog";

  constructor(private toast: NgToastService) {
  }
  showSuccess() {
    this.toast.warning({detail:"Warning",summary:"Miss something? ",duration:5000})
  }
}