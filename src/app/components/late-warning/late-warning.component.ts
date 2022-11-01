/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-late-warning',
  templateUrl: './late-warning.component.html',
  styleUrls: ['./late-warning.component.scss'],
})
export class LateWarningComponent implements OnInit {
  @Input() days: number = 0;

  @Input() date: String = 'erro';

  constructor(public router: Router) { }

  ngOnInit() {
    this.date = this.formatDate(this.date);
  }

  formatDate(date: String): string {
    return format(new Date(date.replace(/-/g, '\/').replace(/T.+/, '')), 'dd/MM/yyyy');
  }

  goToTicket() {
    this.router.navigate(['select-process'], { replaceUrl: true });
  }
}
