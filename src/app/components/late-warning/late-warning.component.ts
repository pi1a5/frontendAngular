/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-late-warning',
  templateUrl: './late-warning.component.html',
  styleUrls: ['./late-warning.component.scss'],
})
export class LateWarningComponent implements OnInit {
  @Input() days: number = 0;

  constructor(public router: Router) { }

  ngOnInit() { }

  goToTicket() {
    this.router.navigate(['select-process'], { replaceUrl: true });
  }
}
