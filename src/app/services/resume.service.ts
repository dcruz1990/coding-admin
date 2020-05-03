import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  baseUrl = 'http://localhost:5050/api'

  constructor(private http: HttpClient, private user: UserService) { }

  getLanguages(userid: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/language/foruser/' + userid).pipe(
      map((languages) => {
        return languages
      }, catchError(err => {
        return err
      }))
    )
  }





}
