import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  highBid = [];
  ppid: any;
  constructor(private http: HttpClient) { }


  //this method returns highest price from bidding table and passes to updateHighestBid method
  async HighestBid(pid: any) {

    console.log(pid);
    const data = {
      "pid": pid
    }
    const url = 'http://localhost:8080/api/Bidding/getHighestBid';
    const response: any = await this.http.post(url, data).toPromise();
    this.highBid = response;

    // console.log(response[0][0]);
    // return response;
    const obj = {
      "pid": pid,
      "highestBid": this.highBid[0][0]
    }
    this.updateHighestBid(obj);
  }


  //this method update the highest price in farmer table
  async updateHighestBid(obj: any) {
    const url = 'http://localhost:8080/api/product/updateBidHighestPrice';
    const response: any = await this.http.post(url, obj).toPromise();
    this.highBid = response;
  }




}
