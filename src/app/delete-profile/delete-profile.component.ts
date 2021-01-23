import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent implements OnInit {
  userProfile: any = [];
  constructor(private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    if (!sessionStorage.getItem('sid')) {
      this.router.navigate(['login']);
    }

    this.displayUserProfile();
  }

  async displayUserProfile() {
    const id = sessionStorage.getItem('delPid');
    if (!id) {
      this.router.navigate(['admin_home']);
    } else {
      const url = 'http://localhost:8080/api/v1/GetUserProfile?email=' + id;
      const result: any = await this.http.get(url).toPromise();

      this.userProfile = result;
      console.log("Profiles is here");
      console.log(result);
    }
  }

  async deleteProfile(id: any) {
    // http://localhost:8080/api/v1/delFBUsers?id=4


    const url = 'http://localhost:8080/api/v1/delFBUsers?id=' + id;
    await this.http.get(url).toPromise();
    this.router.navigate(['admin_home']);
  }

}
