import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private currentPosts = new BehaviorSubject<Post[]>([])

  updatedPosts = this.currentPosts.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      Autorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  baseUrl = 'http://localhost:5050/api'

  constructor(private http: HttpClient, private toast: AlertService, private user: UserService) { }

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

  getUserPosts(userid: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + '/post/foruser/' + userid).pipe(
      map((result) => {
        return result
      }, catchError(err => {
        return err
      }))
    )
  }

  deletePost(postid: number): Observable<boolean> {
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.delete<boolean>(this.baseUrl + '/post/' + postid + '/delete', { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') } }).pipe(
      map((result: boolean) => {
        // tslint:disable-next-line: no-shadowed-variable
        this.getUserPosts(this.user.getCurrentUserId()).subscribe((result) => {
          this.currentPosts.next(result)
        })
        return result
      }, catchError(error => {
        return throwError(error)
      }))
    )
  }

  editProduct(postid: number, newdata: any): Observable<boolean> {
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.put<boolean>(this.baseUrl + '/post/' + postid + '/update', newdata, {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line: object-literal-key-quotes
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .pipe(
        map((response: boolean) => {
          this.getUserPosts(this.user.getCurrentUserId()).subscribe((result) => {
            this.currentPosts.next(result)
          })
          return response
        }, catchError(err => {
          return err
        }))
      )
  }

}
