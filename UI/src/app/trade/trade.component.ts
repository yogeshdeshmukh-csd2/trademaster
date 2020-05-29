import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Trade } from '../trade.model';
import { HttpService } from '../http.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  isfetching: boolean = false;
  @ViewChild("postForm",{static:true}) postF : NgForm;
  error = null;
  private errSubs: Subscription;
  txId: any;

  constructor(private http: HttpClient, private httpServ: HttpService) {}

  ngOnInit() {

    this.errSubs = this.httpServ.error.subscribe(
      errorMsg => {
        this.error = errorMsg;
      }
    )
  }

  onCreateTrade(tradeData: Trade) {
    this.isfetching = true;
    this.httpServ.createAndStoreTrade(tradeData.tradeId, tradeData.recipient, tradeData.amount)
    .subscribe(
      (res)=>{
        this.txId = res.txHash;
        console.log(`res data is ${this.txId}`);
        this.postF.reset();
        this.isfetching = false;
      },
      error=>{
        this.httpServ.error.next(error.message);
        this.error = error;
      }
      );
  }

  onErrorOccure(){
    this.error = null;
  }

  ngOnDestroy(){
    this.errSubs.unsubscribe();
  }
}
