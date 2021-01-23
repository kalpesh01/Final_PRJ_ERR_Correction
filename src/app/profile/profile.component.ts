import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profiles: any = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public sessId = sessionStorage.getItem('sid');


  ngOnInit(): void {
    if (!sessionStorage.getItem('sid')) {
      this.router.navigate(['login']);
    }

    this.displayUserProfile();

  }

  // /GetUserByEmailId

  async displayUserProfile() {
    const id = sessionStorage.getItem('sid');
    const url = 'http://localhost:8080/api/v1/GetUserProfile?email=' + id;
    const result: any = await this.http.get(url).toPromise();

    this.profiles = result;
    console.log("Profiles is here");
    console.log(result);

  }

}
