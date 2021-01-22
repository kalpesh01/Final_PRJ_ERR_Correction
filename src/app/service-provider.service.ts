import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  highBid = [];
  winner = [];
  abc = this.winner.join("");
  ppid: any;

  constructor(private http: HttpClient) { }


  //this method returns highest price from bidding table and passes to updateHighestBid method
  async HighestBid(pid: any) {


    const data = {
      "pid": pid
    }
    const url = 'http://localhost:8080/api/Bidding/getHighestBid';
    const response: any = await this.http.post(url, data).toPromise();
    this.highBid = response;

    console.log("Highest Bid is here");

    const obj = {
      "pid": pid,
      "highestBid": this.highBid[0][0],
      "winnerId": sessionStorage.getItem('mystr')
    }

    const obj1 = {
      "pid": pid,
      "bid_price": this.highBid[0][0]

    }

    this.findWinner(obj1);
    this.updateHighestBid(obj);
    this.demo();

  }


  //this method update the highest price in farmer table
  async updateHighestBid(obj: any) {
    const url = 'http://localhost:8080/api/product/updateBidHighestPrice';
    const response: any = await this.http.post(url, obj).toPromise();

  }

  async findWinner(obj1: any) {
    const url = 'http://localhost:8080/api/Bidding/findWinner';
    const response: any = await this.http.post(url, obj1, { responseType: 'text' }).toPromise();
    this.winner = response;
    const mystr = response;
    console.log(response);
    sessionStorage.setItem("mystr", mystr);
    console.log(mystr);
  }


  demo() {
    console.log(sessionStorage.getItem('mystr'));
    console.log("k");
  }

}
