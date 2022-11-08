/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @ViewChild('pieCanvas', { static: true }) public pieCanvas: ElementRef;

  public pieChart: any;

  public statusName: any[] = [];

  public statusCount: any[] = [];

  constructor(
    public apiSupervisor: ApiSupervisorService,
  ) { }

  ngOnInit() {
    this.apiSupervisor.getInternshipsAmountByStatus().subscribe((data) => {
      for (const [key, value] of Object.entries(data)) {
        this.statusName.push(key);
        this.statusCount.push(value);
      }

      this.pieChartMethod();
    }, (error) => {
      console.log(error);
    });
  }

  pieChartMethod() {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.statusName,
        datasets: [{
          label: 'Estágio teste',
          data: this.statusCount,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgba(153, 102, 25)',
            'rgba(75, 192, 192)',
            'rgba(255, 159, 64)',
            'rgba(100, 100, 255)',
          ],
          hoverBackgroundColor: [
            'rgb(255, 99, 132, 0.8)',
            'rgb(54, 162, 235, 0.8)',
            'rgb(255, 205, 86, 0.8)',
            'rgba(153, 102, 25, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(100, 100, 255, 0.8)',
          ],
        }],
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              // This more specific font property overrides the global property
              usePointStyle: true,
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
        responsive: false,
      },
    });
  }
}
