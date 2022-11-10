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

@Component({
  selector: 'app-bar-courses',
  templateUrl: './bar-courses.component.html',
  styleUrls: ['./bar-courses.component.scss'],
})
export class BarCoursesComponent implements OnInit {
  @ViewChild('barCanvas', { static: true }) public barCanvas: ElementRef;

  public barChart: any;

  @Input() data: any = undefined;

  public courseName: any = [];

  public internshipAmount: any = [];

  // public supervisorsCountClosed: any = [];

  constructor() { }

  ngOnInit() {
    if (this.data) {
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        this.courseName.push(element.nome);
        this.internshipAmount.push(Math.round(element.avg));
      }

      this.barChartMethod();
    }
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.courseName,
        datasets: [
          {
            barPercentage: 0.8,
            barThickness: 'flex',
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
            data: this.internshipAmount,
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
          title: {
            display: true,
            font: {
              size: 25,
              family: "'Nunito', sans-serif",
            },
            padding: {
              top: 10,
              bottom: 30,
            },
            text: 'Horas por curso',
          },
          legend: {
            display: false,
          },
        },
        animation: false,
        responsive: true,
        scales: {
          y: {
            ticks: {

              font: {
                family: "'Nunito', sans-serif",
              },
              callback(value, index, ticks) {
                return `${value} h`;
              },
            },
          },
          x: {
            ticks: {
              stepSize: 1,
              font: {
                size: 15,
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
