/* eslint-disable class-methods-use-this */
/* eslint-disable padded-blocks */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wait-warning',
  templateUrl: './wait-warning.component.html',
  styleUrls: ['./wait-warning.component.scss'],
})
export class WaitWarningComponent implements OnInit {
  @Input() days: number = 0;

  @Input() date: String = 'ha';

  constructor() { }

  ngOnInit() {}

}
