import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Trade } from '../trade.model';
import { HttpService } from '../http.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TradeResponse } from '../tradeResponse.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-findtrade',
  templateUrl: './findtrade.component.html',
  styleUrls: ['./findtrade.component.css']
})
export class FindtradeComponent implements OnInit {

  tradeData: any;
  amount : number;
  recipient : string;
  sender : string;
  tradeDate : string;
  tradeStatus : number;
  tStatusMapping : string;
  tradeRes : TradeResponse[] = [];
  
  isfetching: boolean = false;
  @ViewChild("tradeForm",{static:true}) tradeF : NgForm;
  error = null;
  private errSubs: Subscription;

  constructor(private http: HttpClient, private httpServ: HttpService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    this.errSubs = this.httpServ.error.subscribe(
      errorMsg => {
        this.error = errorMsg;
      }
    )
  }

  onFetchTrade(trade: {[key: string]: string}) {
    console.log(this.tradeF);
    console.log(trade.tradeId);
    this.httpServ.fetchTradeById(trade.tradeId).subscribe(
      (tradeResponse)=>{ 
        this.isfetching = true;
        this.tradeData = tradeResponse;
        this.amount = this.tradeData.amount;
        this.sender = this.tradeData.sender;
        this.recipient = this.tradeData.recipient;
        this.tradeDate = this.tradeData.tradeDate;
        this.tradeStatus = this.tradeData.tradeStatus;
        switch (this.tradeStatus) {
          case 0:
            this.tStatusMapping = "SUBMITTED";
            break;
          case 1:
            this.tStatusMapping = "INPROCESS";
            break;
          case 2:
            this.tStatusMapping = "SETTLED";
              break;
        }
        console.log(this.amount);
        console.log(this.sender);
        console.log(this.recipient);
        console.log(this.tradeDate);
        console.log(this.tradeStatus);
     },
     (error)=>{
       this.error = error.message;
     })
     this.isfetching = false;
  }   

  onLoadAll(){
    this.httpServ.fetchAllTrade().subscribe(
      (trades)=>{
        this.isfetching = true;
        this.tradeRes = trades;
        console.log(trades);
      }
    )
    this.isfetching = false;
    this.tradeRes = [];
  }

  onErrorOccure(){
    this.error = null;
  }

  ngOnDestroy(){
    this.errSubs.unsubscribe();
  }

}
