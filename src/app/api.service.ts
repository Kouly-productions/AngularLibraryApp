import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  // Define the method to fetch data from an API
  fetchMovieData(apiRoot: string, id: string, apiKey: string): Observable<any> {
    // Construct the full API URL using template
    const url = `${apiRoot}?i=${id}&apikey=${apiKey}`;
    // use HttpClient to make a GET request to the API and return the result as an oberservable
    return this.http.get(url);
  }

  fetchGameData(apiRoot: string, id: string, apiKey: string): Observable<any> {
    const url = `${apiRoot}/${id}?key=${apiKey}`;
    return this.http.get(url);
  }
}