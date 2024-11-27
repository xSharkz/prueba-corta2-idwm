import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}`);
  }

  searchCharacters(name: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?name=${name}`);
  }
}
