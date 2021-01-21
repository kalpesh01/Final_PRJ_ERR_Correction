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
  constructor(private router: Router, private modalService: NgbModal) { }
  public sessId = sessionStorage.getItem('sid');


  ngOnInit(): void {
    if (!sessionStorage.getItem('sid')) {
      this.router.navigate(['login']);
    }
  }

  processLogout() {

    this.modalService.open(LogoutModalComponent, {
      centered: true,
    });
  }

}
