/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, OnInit,
} from '@angular/core';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';

@Component({
  selector: 'app-chart-supervisors',
  templateUrl: './chart-supervisors.page.html',
  styleUrls: ['./chart-supervisors.page.scss'],
})
export class ChartSupervisorsPage implements OnInit {
  loaded = false;

  chart = 'first';

  checkOrientadoresAmount = undefined;

  internshipsAmountByCourse = undefined;

  constructor(public apiSupervisor: ApiSupervisorService) { }

  ngOnInit() {
    this.getOrientadoresAmount();
    this.getInternshipsAmountByCourse();
  }

  getOrientadoresAmount() {
    this.apiSupervisor.checkOrientadoresAmount()
      .subscribe((data) => {
        this.loaded = true;
        this.checkOrientadoresAmount = data;
      }, (error) => {
        console.log(error);
      });
  }

  getInternshipsAmountByCourse() {
    this.apiSupervisor.getInternshipsAmountByCourse()
      .subscribe((data) => {
        this.internshipsAmountByCourse = data;
      }, (error) => {
        console.log(error);
      });
  }
}
