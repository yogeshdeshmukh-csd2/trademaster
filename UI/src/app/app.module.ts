import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TradeComponent } from './trade/trade.component';
import { FindtradeComponent } from './findtrade/findtrade.component';

const appRoutes: Routes = [
  {path:'add', component: TradeComponent},
  {path:'find', component: FindtradeComponent}
]
@NgModule({
  declarations: [AppComponent, TradeComponent, FindtradeComponent],
  imports: [BrowserModule, 
    FormsModule, 
    HttpClientModule,
  RouterModule.forRoot(appRoutes)],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule {}
