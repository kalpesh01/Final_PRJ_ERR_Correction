import { HttpClient } from '@angular/common/http';
import { convertMetaToOutput } from '@angular/compiler/src/render3/util';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProviderService } from '../data-provider.service';
import { ServiceProviderService } from '../service-provider.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})


export class ProductDetailsComponent implements OnInit {



  comments: any = [{ "bid": "Helloworld", "bidderName": "Kalpesh" }];
  hb: any;
  details: any = [];


  constructor(private dp: DataProviderService,
    private http: HttpClient,
    private router: Router,
    private sp: ServiceProviderService,

  ) { }

  ngOnInit(): void {
    this.details = this.dp.productData;

    this.getProductData();
  }




  async placeBid(bd: any) {
    this.hb = this.details[0].highestBid;
    // console.log(bd + " ****** " + this.hb);
    if (bd.value != null) {
      //  if (bd.value <= this.hb) {
      //   console.log("Bid  value less than highest bid");
      // } else {

      //   const data = {
      //     "pid": sessionStorage.getItem("pid"),
      //     "bid_price": bd,
      //     "buyerId": sessionStorage.getItem("sid")
      //   }

      //   const url = 'http://localhost:8080/api/Bidding/addBid';
      //   const productRes: any = await this.http.post(url, data).toPromise();
      //   console.log(productRes);
      // }
    } else if (isNaN(bd)) {
      console.log("Not A number");
    } else {
      console.log("Enter the Value");
    }
  }





  async getProductData() {
    // const pid = this.sp.ppid;
    let pid = sessionStorage.getItem('pid');
    console.log(pid);

    const url = 'http://localhost:8080/api/product/getProductsUsingProductId?pid=' + pid;
    const productRes: any = await this.http.get(url).toPromise();

    console.log(productRes);
    if (productRes.length == 0) {
    } else {
      console.log("data came here");
      this.details = productRes;

    }
  }

}
