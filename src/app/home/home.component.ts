import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAirFreshener } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public faAirFreshener = faAirFreshener;
  constructor(private router: Router, private modalService: NgbModal) { }
  public sessId = sessionStorage.getItem('sid');


  ngOnInit(): void {

  }

}

