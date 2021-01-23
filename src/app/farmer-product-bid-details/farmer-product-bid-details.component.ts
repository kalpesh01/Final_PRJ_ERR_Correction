import { HttpClient } from '@angular/common/http';
import { DataProviderService } from './../data-provider.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-product-bid-details',
  templateUrl: './farmer-product-bid-details.component.html',
  styleUrls: ['./farmer-product-bid-details.component.css']
})
export class FarmerProductBidDetailsComponent implements OnInit {

  price = "";
  postPrice: string[] = [];
  comments: any = [{ "bid": "Helloworld", "bidderName": "Mangesh" }];

  details: any = [];
  constructor(
    private dp: DataProviderService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!sessionStorage.getItem('sid')) {
      this.router.navigate(['login']);
    }
    this.details = this.dp.productData;
    this.getProductData()
    this.startTimer();
  }


  async getProductData() {
    // const pid = this.sp.ppid;
    let pid = sessionStorage.getItem('fpid');
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

  refresh(): void {
    window.location.reload();
  }

  time: number = 0;
  interval: any;
  play: boolean = false;
  startTimer() {
    this.play = true;
    this.interval = setInterval(() => {

      this.refresh();
    }, 30000)
  }

  pauseTimer() {
    this.play = false;
    clearInterval(this.interval);
  }


}
