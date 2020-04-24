import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOptions = {
    headers: new HttpHeaders({
      Autorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  baseUrl = 'http://localhost:5050/api'

  constructor(private http: HttpClient, private toast: AlertService) { }

  newPost(postdata) {
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(this.baseUrl + '/post/create', postdata, { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') } }).pipe(
      map((result: any) => {
        if (result) {
          this.toast.showToast('bottom-left', 'success', 'Post uploaded!', 'Your post was uploaded succesfully')
        }
        return result;
      }), catchError(error => {
        this.toast.showToast('top-right', 'danger', 'Error `$error.statusText`', 'There was a problem trying to upload the post')
        // return throwError('Something went wrong!');
        return throwError('Something went wrong!');

      })
    )
  }
}
