import { HttpClient } from '@angular/common/http';
import { convertMetaToOutput } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})


export class ProductDetailsComponent implements OnInit {

  price = "";
  postPrice: string[] = [];

  comments: any = [{ "bid": "Helloworld", "bidderName": "Kalpesh" }];

  details: any = [];


  constructor(private dp: DataProviderService, private http: HttpClient) { }

  ngOnInit(): void {
    this.details = this.dp.productData;

  }


  async placeBid(bd: any) {
    const data = {
      "pid": this.dp.productId,
      "bid_price": bd,
      "buyerId": sessionStorage.getItem("sid")
    }

    const url = 'http://localhost:8080/api/Bidding/addBid';
    const productRes: any = await this.http.post(url, data).toPromise();
    console.log(productRes);
  }
}
