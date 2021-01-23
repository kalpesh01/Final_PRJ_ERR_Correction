import { Component, OnInit } from '@angular/core';
import { faAirFreshener } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public faAirFreshener = faAirFreshener;
  public uiInvalidCredential = false;


  public fbFormGroup = this.fb.group({
    email: ['', Validators.required],
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

  // tslint:disable-next-line:typedef   removes white spaces
  async loginProcessHere() {
    const data = this.fbFormGroup.value;
    const url = 'http://localhost:8080/api/v1/validateUser';
    const result: any = await this.http.post(url, data).toPromise();

    // console.log(result.length);
    // console.log(roll + " " + umail);
    if (result.length == 0) {
      this.uiInvalidCredential = true;
      this.fbFormGroup.reset();
      // this.router.navigate(['login']);
    }
    else {

      let roll = result[0].type;
      let umail = result[0].email;

      if (roll == "f") {
        sessionStorage.setItem('sid', umail);
        this.router.navigate(['farmer_home']);
      }
      else if (roll == "b") {
        sessionStorage.setItem('sid', umail);
        this.router.navigate(['buyer_home']);

      } else if (roll == "a") {
        sessionStorage.setItem('sid', umail);
        this.router.navigate(['admin_home']);
      }
      else {
        this.uiInvalidCredential = true;
        // this.router.navigate(['login']);
        this.fbFormGroup.reset();
      }

    }


  }
}
