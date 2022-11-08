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
  selector: 'app-pie-courses',
  templateUrl: './pie-courses.component.html',
  styleUrls: ['./pie-courses.component.scss'],
})
export class PieCoursesComponent implements OnInit {
  @ViewChild('barCanvas', { static: true }) public barCanvas: ElementRef;

  public loaded: boolean = false;

  public barChart: any;

  @Input() data: any = undefined;

  public courseName: any = [];

  public internshipAmount: any = [];

  // public supervisorsCountClosed: any = [];

  constructor(
    public apiSupervisor: ApiSupervisorService,
  ) { }

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
      type: 'polarArea',
      data: {
        labels: this.courseName,
        datasets: [{
          data: this.internshipAmount,
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
          // hoverOffset: 0.5,
        }],
      },
      options: {
        animation: false,
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
            text: 'Estágios por curso',
          },
          legend: {
            position: 'bottom',
            labels: {
              // This more specific font property overrides the global property
              usePointStyle: true,
              font: {
                family: "'Nunito', sans-serif",
                size: 14,
              },
            },
          },
        },
        responsive: true,
      },
    });
  }
}
