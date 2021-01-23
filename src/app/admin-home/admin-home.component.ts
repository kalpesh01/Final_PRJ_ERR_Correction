import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAirFreshener } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  public faAirFreshener = faAirFreshener;
  userList: any = [];



  constructor(private router: Router,
    private modalService: NgbModal,
    private http: HttpClient) { }

  public sessId = sessionStorage.getItem('sid');


  ngOnInit(): void {
    if (!sessionStorage.getItem('sid')) {
      this.router.navigate(['login']);
    }

    this.getUsersList();
  }

  processLogout() {

    this.modalService.open(LogoutModalComponent, {
      centered: true,
    });
  }


  async getUsersList() {
    const url = 'http://localhost:8080/api/v1/GetFBUsers';
    const allUsers: any = await this.http.get(url).toPromise();

    if (allUsers == 0) {

    }
    else {
      console.log("Data Came here");
      this.userList = allUsers;
      console.log(allUsers);
    }
  }


  goToUserDelete(data: any) {

    // console.log(data);
    sessionStorage.setItem('delPid', data);
    this.router.navigate(['delete_profile']);
  }

}
