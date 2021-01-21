import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAirFreshener } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'app-farmer-home',
  templateUrl: './farmer-home.component.html',
  styleUrls: ['./farmer-home.component.css']
})
export class FarmerHomeComponent implements OnInit {
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
