import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('dropdown', { read: ElementRef }) dropdown: ElementRef;
  showDropdown = false;

  //åbner dropdown menuen
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  //lukker dropdown menuen når man vælger en option
  closeDropdown() {
    this.showDropdown = false;
  }
}