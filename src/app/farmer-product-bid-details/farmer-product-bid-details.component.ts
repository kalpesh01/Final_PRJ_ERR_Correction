import { HttpClient } from '@angular/common/http';
import { DataProviderService } from './../data-provider.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmer-product-bid-details',
  templateUrl: './farmer-product-bid-details.component.html',
  styleUrls: ['./farmer-product-bid-details.component.css']
})
export class FarmerProductBidDetailsComponent implements OnInit {

  price = "";
  postPrice : string[] =[];
  comments: any =[{ "bid" : "Helloworld","bidderName" : "Mangesh" }];

  details : any  = [];
  constructor( private dp : DataProviderService,
    private http : HttpClient) { }

  ngOnInit(): void {
    this.details = this.dp.productData;
  }

}
