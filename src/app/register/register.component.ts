import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // public faAirFreshener = faAirFreshener;
  selectedFile = null;
  public uiInvalidCredential = false;
  public isValidEmail = false;

  OnSelectImage(_event: any) {
    this.selectedFile = _event.target.files[0];
    console.log(_event.target.files[0]);
  }


  public fbFormGroup = this.fb.group({
    // id: ['', Validators.required],
    type: ['', Validators.required],
    fname: ['', Validators.required],
    // img: ['', Validators.required],
    lname: ['', Validators.required],
    password: ['', Validators.required],
    birthdate: ['', Validators.required],
    mno: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/)]],

  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  async checkEmail() {
    const data = this.fbFormGroup.value;

    const url = 'http://localhost:8080/api/v1/validateUserEmail';
    const myres = await this.http.post(url, data).toPromise();
    console.log(myres);
    if (myres == true) {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = false;
    }
  }




  async registerHere() {


    if (this.isValidEmail == false) {
      const data = this.fbFormGroup.value;
      const url = 'http://localhost:8080/api/v1/addusr';
      const myres = await this.http.post(url, data, { responseType: 'text' }).toPromise();
      console.log("Suceess" + myres);
      this.router.navigate(['login']);

    }
    else {
      this.uiInvalidCredential = true;
    }
    const data = this.fbFormGroup.value;
    console.warn(data);
  }

}
