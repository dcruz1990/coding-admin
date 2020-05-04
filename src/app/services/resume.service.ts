import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Language } from '../models/Language';



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

  addLanguage(langdata: any): Observable<any> {
    return this.http.post(this.baseUrl + '/language/create', langdata, {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line: object-literal-key-quotes
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(
      map(
        (result) => {
          return result
        }
      ))
  }

  deleteLanguage(languageid: string) {
    return this.http.delete(this.baseUrl + '/language/' + languageid + '/delete', {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line: object-literal-key-quotes
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(map(
      (result) => {
        return result
      }, catchError(err => {
        return err
      })
    ))
  }

  updateLanguage(lanid: any, langdata: string) {
    return this.http.put(this.baseUrl + '/language/' + lanid + '/update', langdata, {
      headers: {
        'Content-Type': 'application/json-patch+json',
        // tslint:disable-next-line: object-literal-key-quotes
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(
      map(
        (result) => {
          return result
        }, catchError(err => {
          return err
        })
      )
    )
  }

  getEducation(userid: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/education/foruser/' + userid).pipe(
      map((education) => {
        return education
      }, catchError(err => {
        return err
      }))
    )
  }

  addEducation(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/education/create', data, {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line: object-literal-key-quotes
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(
      map(
        (result) => {
          return result
        }
      ))
  }

  deleteEducation(educationid: string) {
    return this.http.delete(this.baseUrl + '/education/' + educationid + '/delete', {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line: object-literal-key-quotes
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(map(
      (result) => {
        return result
      }, catchError(err => {
        return err
      })
    ))
  }

  updateEducation(eduid: any, data: string) {
    return this.http.put(this.baseUrl + '/education/' + eduid + '/update', data, {
      headers: {
        'Content-Type': 'application/json-patch+json',
        // tslint:disable-next-line: object-literal-key-quotes
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(
      map(
        (result) => {
          return result
        }, catchError(err => {
          return err
        })
      )
    )
  }





}
