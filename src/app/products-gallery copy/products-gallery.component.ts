import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProviderService } from '../data-provider.service';
import { ServiceProviderService } from '../service-provider.service';


@Component({
  selector: 'app-products-gallery',
  templateUrl: './products-gallery.component.html',
  styleUrls: ['./products-gallery.component.css']
})
export class ProductsGalleryComponent implements OnInit {



  productList: any = [];
  product: any = [];


  constructor(private router: Router,
    private http: HttpClient,
    private dp: DataProviderService,
    private sps: ServiceProviderService
  ) { }



  ngOnInit(): void {

    this.getProductsList();
  }
  refresh(): void {
    window.location.reload();
  }
  // http://localhost:8080/api/product/GetFarmerDetails

  async getProductsList() {

    const url = 'http://localhost:8080/api/product/GetFarmerDetails';
    const myres: any = await this.http.get(url).toPromise();

    if (myres.length == 0) {
      this.productList = myres;
      // console.log("empty");
    } else {
      console.log("data came here");
      this.productList = myres;
      console.log(myres);
    }
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

      this.router.navigate(['/buyer_home/productBidDetails']);
    }
  }
}
