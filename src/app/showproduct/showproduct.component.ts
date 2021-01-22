import { Router } from '@angular/router';
import { ServiceProviderService } from './../service-provider.service';
import { DataProviderService } from './../data-provider.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';






@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {


  productList: any = [];
  product: any = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private dp: DataProviderService,
    private sps: ServiceProviderService) { }

  ngOnInit(): void {
    this.getProductsList();
  }
  refresh(): void {
    window.location.reload();
  }

  async getProductsList() {
    const usrid = sessionStorage.getItem('sid');
    const url = 'http://localhost:8080/api/product/getProductsUsingFarmerId?usrid=' + usrid;
    const myres: any = await this.http.get(url).toPromise();
    console.log("data came here");
    this.productList = myres;
  }

  async viewBid(pid: any) {

    const url = 'http://localhost:8080/api/product/getProductsUsingProductId?pid=' + pid;
    const productRes: any = await this.http.get(url).toPromise();
    console.log(productRes);
    if (productRes.length == 0) {
      this.dp.productData = productRes;
      this.router.navigate(['']);

    } else {
      console.log("data came here");
      this.dp.productData = productRes;
      console.log(productRes);
      this.sps.HighestBid(pid);

      this.router.navigate(['/farmer_home/farmerProductBidDetails']);
    }
  }
}
