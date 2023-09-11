import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly Game_API_ROOT_URL = 'https://rawg.io/api';
  readonly Game_API_KEY = '8bcdd82ce88745748f2b622d3e34c1ce';
  constructor(private http: HttpClient) { }

  fetchMovieData(apiRoot: string, id: string, apiKey: string): Observable<any> {
    const url = `${apiRoot}?i=${id}&apikey=${apiKey}`;
    return this.http.get(url);
  }

  fetchGameData(id: string): Observable<any> {
    const url = `${this.Game_API_ROOT_URL}/games?i=${id}&key=${this.Game_API_KEY}`;
    console.log("URL being used: ", url);
    return this.http.get(url);
  }
}