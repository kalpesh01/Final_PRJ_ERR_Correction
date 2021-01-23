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
    fname: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]){1,15}$/)]],
    // img: ['', Validators.required],
    lname: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]){1,15}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^([a-zA-Z])([!-@0-9a-zA-Z]){5,20}$/)]],
    birthdate: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
    mno: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email: ['', [Validators.required, Validators.pattern(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{1,5})/)]],

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
