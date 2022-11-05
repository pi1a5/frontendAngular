/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
/* eslint-disable padded-blocks */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-wait-warning',
  templateUrl: './wait-warning.component.html',
  styleUrls: ['./wait-warning.component.scss'],
})
export class WaitWarningComponent implements OnInit {
  @Input() days: number = 0;

  @Input() date: String = 'erro';

  constructor() { }

  ngOnInit() {
    this.date = this.formatDate(this.date);
  }

  formatDate(date: String): string {
    return format(new Date(date.replace(/-/g, '\/').replace(/T.+/, '')), 'dd/MM/yyyy');
  }

}
