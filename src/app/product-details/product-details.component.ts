import { HttpClient } from '@angular/common/http';

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



  allbids: any = [{ "bid": "Helloworld", "bidderName": "Kalpesh" }];
  details: any = [];
  mp: any;
  hb: any;

  constructor(private dp: DataProviderService,
    private http: HttpClient,
    private router: Router,
    private sp: ServiceProviderService,

  ) { }

  ngOnInit(): void {
    this.details = this.dp.productData;
    this.getProductData();
    this.startTimer();
    this.displayBids();
  }

  refresh(): void {
    window.location.reload();
  }


  async placeBid(bd: any) {
    this.hb = this.details[0].highestBid;
    this.mp = this.details[0].minPrice;

    if (bd != "") {
      if (isNaN(bd)) {
        console.log("Not A number");
      } else if (bd <= this.hb || bd <= this.mp) {
        console.log("Bid  value less than and equak to highest bid");
      }
      else {

        const data = {
          "pid": sessionStorage.getItem("pid"),
          "bid_price": bd,
          "buyerId": sessionStorage.getItem("sid")
        }

        const url = 'http://localhost:8080/api/Bidding/updateBid';
        const productRes: any = await this.http.post(url, data).toPromise();
        console.log(productRes);
        this.sp.HighestBid(sessionStorage.getItem("pid"));
        this.refresh();
      }
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


  async displayBids() {
    const obj = { "pid": sessionStorage.getItem('pid') }
    const url = 'http://localhost:8080/api/Bidding/getBidsOnPid';
    const res = await this.http.post(url, obj).toPromise();
    console.log(res);
    this.allbids = res;
  }

  time: number = 0;
  interval: any;
  play: boolean = false;
  startTimer() {
    this.play = true;
    this.interval = setInterval(() => {

      this.refresh();
    }, 60000)
  }

  pauseTimer() {
    this.play = false;
    clearInterval(this.interval);
  }


}
