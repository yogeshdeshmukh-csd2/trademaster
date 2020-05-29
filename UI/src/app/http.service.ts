import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Trade } from './trade.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { TradeResponse } from './tradeResponse.model';

@Injectable({providedIn: 'root'})
export class HttpService{

    error = new Subject<string>();
    constructor(private http: HttpClient){}

    createAndStoreTrade(tradeId: string, recipient: string, amount: number){
        const tradeData: Trade = {tradeId : tradeId, recipient : recipient, amount : amount}; 
        return this.http
        .post<{[key: string]: string}>( 
        'http://localhost:3000',
        tradeData,
        {
          headers: new HttpHeaders({"Access-Control-Allow-Origin" : "*"})
        },
        );
    }

    fetchTradeById(tradeId: string){
    return this.http
      .get(`http://localhost:3000/${tradeId}`
      );
    }

    fetchAllTrade(){
      return this.http
        .get<TradeResponse[]>(`http://localhost:3000/`
        );
      }

}