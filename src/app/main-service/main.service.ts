import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Server } from '../Server';
import { LoadMethod } from '../loadMethod';
import { CommonResponse } from '../commonResponse';
import { OrderDto } from '../orderModels/orderDto';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private serversURL = 'api/servers/availible/servers';
  private loadMethodsURL = 'api/config/loadMethods';
  private orderProductURL = 'api/order';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(this.serversURL)
      .pipe(
        tap(_ => this.log('fetched servers')),
        catchError(this.handleError<Server[]>('getServers', []))
      );
  }

  getLoadMethods(): Observable<LoadMethod[]> {
    return this.http.get<LoadMethod[]>(this.loadMethodsURL)
      .pipe(
        tap(_ => this.log('fetched load methods')),
        catchError(this.handleError<LoadMethod[]>('getLoadMethods', []))
      );
  }

  orderProduct(order: OrderDto): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(this.orderProductURL, order, this.httpOptions)
      .pipe(map(response => {
        return CommonResponse.serialize(response);
      })
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`MainServer: ${message}`);
  }

}
