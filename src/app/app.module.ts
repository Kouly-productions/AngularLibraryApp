import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { NgToastModule } from 'ng-angular-popup';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';
import 'hammerjs';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { GamesComponent } from './games/games.component';
import { BooksComponent } from './books/books.component';
import { ComicsComponent } from './comics/comics.component';
import { MyListComponent } from './my-list/my-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    }
  ]
})

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    GamesComponent,
    BooksComponent,
    ComicsComponent,
    MyListComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgToastModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    ToastrModule,
    HomeComponent,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

