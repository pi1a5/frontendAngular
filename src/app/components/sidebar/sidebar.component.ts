import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }

  goToNewTicket() {
    this.router.navigate(['select-ticket-type'], { replaceUrl: true });
  }

  goToDashboard() {
    this.router.navigate(['student'], { replaceUrl: true });
  }

  goToProfile() {
    this.router.navigate(['profile'], { replaceUrl: true });
  }

}
