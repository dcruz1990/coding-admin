import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/Product';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:5050/api'

  constructor(private http: HttpClient) { }

  getProducts(userid: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/product/' + userid)
  }

  addProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + '/product/create', data, { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') } }).pipe(
      map((result: any) => {
        return result;
      }), catchError(error => {
        console.log(error)
        return throwError(error);
        // return error

      })
    )
  }




}
