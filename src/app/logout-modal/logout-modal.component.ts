import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css'],
})
export class LogoutModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit(): void { }

  closeTheModal() {
    this.activeModal.dismiss();
  }

  logOutAndClose() {
    sessionStorage.removeItem('sid');

    // dismiss the modal
    this.activeModal.dismiss();

    this.router.navigate(['login']);
  }
}
