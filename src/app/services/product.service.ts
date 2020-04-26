import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:5050/api'

  getPosts(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + '/post/' + id);
  }
}
