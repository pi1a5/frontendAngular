/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';

@Component({
  selector: 'app-ticket-bar-chart',
  templateUrl: './ticket-bar-chart.component.html',
  styleUrls: ['./ticket-bar-chart.component.scss'],
})
export class TicketBarChartComponent implements OnInit {
  @ViewChild('pieCanvas', { static: true }) public pieCanvas: ElementRef;

  public pieChart: any;

  public months: any[] = [];

  public acceptedTickets: any[] = [];

  public refusedTickets: any[] = [];

  public year: string = '';

  constructor(
    public apiSupervisor: ApiSupervisorService,
  ) { }

  ngOnInit() {
    this.apiSupervisor.getTicketsStatusByDate().subscribe((data) => {
      this.year = Object.entries(data)[0][0];
      console.log(Object.entries(Object.entries(data)[0][1]));
      for (const [key, value] of Object.entries(Object.entries(data)[0][1])) {
        this.months.push(key);
        this.acceptedTickets.push(value.aceito);
        this.refusedTickets.push(value.recusado);
      }
      this.pieChartMethod();
    }, (error) => {
      console.log(error);
    });
  }

  pieChartMethod() {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Aceitos',
          data: this.acceptedTickets,
          backgroundColor: '#3eae91',
        },
        {
          label: 'Recusados',
          data: this.refusedTickets,
          backgroundColor: 'rgb(255, 99, 132)',
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: this.year,
            font: {
              family: "'Nunito', sans-serif",
              size: 20,
            },
          },
          legend: {
            position: 'top',
            labels: {
              // This more specific font property overrides the global property
              font: {
                family: "'Nunito', sans-serif",
                size: 20,
              },
            },
          },
        },
        animation: {
          duration: 2000,
        },
        responsive: true,
        indexAxis: 'x',
        scales: {
          y: {
            ticks: {
              stepSize: 1,
              font: {
                family: "'Nunito', sans-serif",
              },
            },
          },
          x: {
            ticks: {
              stepSize: 1,
              font: {
                family: "'Nunito', sans-serif",
              },
            },
            beginAtZero: true,
          },
        },
      },
    });
  }
}
