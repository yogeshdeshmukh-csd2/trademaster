import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Trade } from './trade.model';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(){

  }
  constructor(private router: Router, private route: ActivatedRoute){}

  
}
