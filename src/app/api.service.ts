import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  fetchData(apiRoot: string, id: string, apiKey: string): Observable<any> {
    const url = `${apiRoot}?i=${id}&apikey=${apiKey}`;
    return this.http.get(url);
  }

  fetchGameData(id: string, apiKey: string): Observable<any> {
    const apiRoot = '/rawg-api'; // Specific to RAWG API
    const url = `${apiRoot}/api/games?i=${id}&apikey=${apiKey}`; // Replace '/api/games' with the actual endpoint
    return this.http.get(url);
  }  
}