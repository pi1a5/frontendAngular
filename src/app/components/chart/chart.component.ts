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
import { Router } from '@angular/router';
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

  public supervisorsName: any = [];

  public supervisorsCount: any = [];

  constructor(
    public router: Router,
    public apiSupervisor: ApiSupervisorService,
  ) { }

  ngOnInit() {
    this.apiSupervisor.checkOrientadoresAmount().subscribe((data) => {
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        this.supervisorsName[index] = data[index].nome;
        this.supervisorsCount[index] = data[index].quantidade;
      }

      this.loaded = true;
      this.barChartMethod();
    }, (error) => {
      console.log(error);
    });
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.supervisorsName,
        datasets: [{
          barPercentage: 0.8,
          barThickness: 'flex',
          label: 'Alunos',
          stack: 'Base',
          backgroundColor: '#00795F',
          hoverBackgroundColor: '#3eae91',
          data: this.supervisorsCount,
        }],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                family: "'Nunito', sans-serif",
              },
            },
          },
        },
        animation: {
          duration: 2000,
        },
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