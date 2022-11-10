/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import {
  Component, ElementRef, Input, OnInit, ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('barCanvas', { static: true }) public barCanvas: ElementRef;

  public loaded: boolean = false;

  public barChart: any;

  @Input() data: any = undefined;

  public supervisorsName: any = [];

  public supervisorsCountOpen: any = [];

  constructor(
    public apiSupervisor: ApiSupervisorService,
  ) { }

  ngOnInit() {
    if (this.data) {
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        this.supervisorsName.push(element.nome);
        this.supervisorsCountOpen.push(element.quantidade);
      }
      this.barChartMethod();
    }
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.supervisorsName,
        datasets: [
          {
            barPercentage: 0.8,
            barThickness: 'flex',
            label: 'Estágios em andamento',
            stack: 'Base',
            backgroundColor: [
              'rgb(255, 99, 132, 0.5)',
              'rgb(54, 162, 235, 0.5)',
              'rgb(255, 205, 86, 0.5)',
              'rgba(153, 102, 25, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(100, 100, 255, 0.5)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgba(153, 102, 25)',
              'rgba(75, 192, 192)',
              'rgba(255, 159, 64)',
              'rgba(100, 100, 255)',
            ],
            hoverBorderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgba(153, 102, 25)',
              'rgba(75, 192, 192)',
              'rgba(255, 159, 64)',
              'rgba(100, 100, 255)',
            ],
            hoverBackgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgba(153, 102, 25)',
              'rgba(75, 192, 192)',
              'rgba(255, 159, 64)',
              'rgba(100, 100, 255)',
            ],
            data: this.supervisorsCountOpen,
          },
        ],
      },
      options: {
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        animation: false,
        responsive: true,
        indexAxis: 'y',
        scales: {
          y: {
            ticks: {
              font: {
                family: "'Nunito', sans-serif",
              },
            },
          },
          x: {
            ticks: {
              stepSize: 1,
            },
            suggestedMax: 6,
            beginAtZero: true,
          },
        },
      },
    });
  }
}
