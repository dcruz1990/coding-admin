import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private currentPosts = new BehaviorSubject<Product[]>([])

  updatedPost = this.currentPosts.asObservable();

  baseUrl = 'http://localhost:5050/api'

  constructor(private http: HttpClient, private user: UserService) { }

  getProducts(userid: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/product/' + userid).pipe(
      map((result) => {
        return result
      }, catchError(err => {
        return err
      }))
    )
  }

  deleteProduct(productid: number): Observable<boolean> {
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.delete<boolean>(this.baseUrl + '/product/' + productid + '/delete', { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') } }).pipe(
      map((result: boolean) => {
        this.getProducts(this.user.getCurrentUserId()).subscribe((result) => {
          this.currentPosts.next(result)
        })
        return result
      }, catchError(error => {
        return throwError(error)
      }))
    )
  }

  addProduct(data: Product): Observable<Product> {
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post<Product>(this.baseUrl + '/product/create', data, { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') } }).pipe(
      map((result: any) => {
        return result;
      }), catchError(error => {
        return throwError(error);
        // return error

      })
    )
  }




}
