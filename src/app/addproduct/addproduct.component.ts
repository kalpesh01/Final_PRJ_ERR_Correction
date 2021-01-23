import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  providers: [DatePipe]
})
export class AddproductComponent implements OnInit {

  productlist: [] | undefined;
  public uiInvalidCredential = false;
  public isValidDate = false;
  public invalidDate = false;

  public fbFormGroup = this.fb.group({

    img: ['', Validators.required],
    pname: ['', Validators.required],
    quantity: ['', Validators.required],
    endBDate: ['', Validators.required],
    minPrice: ['', Validators.required],
  });

  myDate: any = new Date();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private datePipe: DatePipe,
  ) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {

  }

  async addProduct() {

    if (this.isValidDate == true) {
      this.uiInvalidCredential = true;
      this.fbFormGroup.reset();
    } else {
      const data = this.fbFormGroup.value;
      data['uid'] = sessionStorage.getItem('sid');
      const url = 'http://localhost:8080/api/product/addProduct';
      const myres = await this.http.post(url, data, { responseType: 'text' }).toPromise();
      console.log(myres);
      console.log("Product Added Successfully");
      this.fbFormGroup.reset();
    }
  }


  dateValidate(dt: any) {
    // const db = this.fbFormGroup.controls['endBDate'].value
    // console.log("**********");
    // console.log(db);
    if (dt <= this.myDate) {
      this.fbFormGroup.invalid
      this.isValidDate = true;
    } else {
      this.isValidDate = false;
    }
  }
}
