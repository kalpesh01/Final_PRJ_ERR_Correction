import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  highBid = [];
  InActiveBidData: any = [];
  WinnerDetails: any = [];
  winner = [];
  abc = this.winner.join("");
  ppid: any;
  prev: number = 0;

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
    console.log(response);
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

  /**  Biding logic starts from here */
  async liveBidding() {
    const url = 'http://localhost:8080/api/product/changeStatusInactiveBids';
    const response: any = await this.http.get(url).toPromise();
    this.chnagedStatusProducts();
    console.log("test-1");
  }

  async chnagedStatusProducts() {
    const url = 'http://localhost:8080/api/product/getDetailsChangedStatus';
    const response: any = await this.http.get(url).toPromise();
    console.log("test-2");

    this.InActiveBidData = response;

    for (let i = 0; i < this.InActiveBidData.length; i++) {

      sessionStorage.setItem("delPrdctId", this.InActiveBidData[i].pid)
      this.getWinnerDetails(this.InActiveBidData[i].uid, this.InActiveBidData[i].winnerId);
      console.log("for loo test-3");
    }


  }

  async getWinnerDetails(uid: any, winnerId: any) {
    const obj1 = { "email": uid }
    const url = 'http://localhost:8080/api/v1/GetUserByEmailId';
    const resp = await this.http.post(url, obj1).toPromise();
    this.WinnerDetails = resp;
    console.log("test-4");
    const data = this.WinnerDetails[0];

    if (winnerId != null) {
      this.sendMailToWinner(data, winnerId);
      console.log("Mail sent to the winner");
      this.deleteExpiredBidProduct();
      console.log("Expired Bid Product Deleted");
    }


  }

  async sendMailToWinner(data: any, winnerId: any) {
    console.log("farmer details shared to winner");
    data['winnerId'] = winnerId;
    console.log("!!!!!!!!!!!!");
    console.log(data);
    const url = 'http://localhost:8080/api/v1/sendMail';
    await this.http.post(url, data).toPromise();
  }

  async deleteExpiredBidProduct() {
    let pid = sessionStorage.getItem('delPrdctId');
    const url = 'http://localhost:8080/api/product/deleteExpiredBidProduct?pid=' + pid;
    await this.http.get(url).toPromise();
  }

}
