import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  public uiInvalidCredential = false;
  public isValidEmail = false;
  public isValid = false;
  // public alertMessage = false;


  public fbFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/)]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const sid = 'null';
  }

  async checkEmail() {
    const data = this.fbFormGroup.value;

    const url = 'http://localhost:8080/api/v1/validateUserEmail';
    const myres = await this.http.post(url, data).toPromise();
    console.log(myres);
    if (myres == true) {
      this.isValidEmail = false;
      this.isValid = true;
    } else {
      this.isValidEmail = true;

    }
  }
  async forgetProcessHere() {
    const data = this.fbFormGroup.value;
    // ajax call
    const url = 'http://localhost:8080/api/v1/forgetpassword';
    const result: any = await this.http.post(url, data).toPromise();

    // console.log(result);

    if (result == true) {
      this.router.navigate(['login']);
    } else {
      this.uiInvalidCredential = true;
    }
  }

}
