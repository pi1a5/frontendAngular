/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
      for (let index = 0; index < Object.entries(this.data).length; index++) {
        const element = Object.entries(this.data)[index];
        this.courseName.push(element[0]);
        this.internshipAmount.push(element[1]);
      }
      // for (let index = 0; index < 6; index++) {
      //   this.supervisorsName.push(`Orientador ${index}`);
      //   this.supervisorsCountOpen.push(Math.ceil(Math.random() * 15));
      // }
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
            label: this.courseName,
            stack: 'Base',
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
            'rgba(255, 255, 255, 0.8)',
          ],
            // hoverBackgroundColor: '#3eae91',
            data: this.internshipAmount,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, 
          }
        },
        animation: false,
        responsive: true,
        indexAxis: 'x',
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
              font: {
                family: "'Nunito', sans-serif",
              },
            },
            suggestedMax: 6,
            beginAtZero: true,
          },
        },
      },
    });
  }
}
