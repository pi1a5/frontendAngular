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

  public supervisorsCountClosed: any = [];

  constructor(
    public apiSupervisor: ApiSupervisorService,
  ) { }

  ngOnInit() {
    this.apiSupervisor.checkOrientadoresAmount().subscribe((data) => {
      // console.log(data);
      // for (let index = 0; index < data.length; index++) {
      //   this.supervisorsName[index] = data[index].nome;
      //   this.supervisorsCount[index] = data[index].quantidade;
      // }

      for (let index = 0; index < 5; index++) {
        this.supervisorsName[index] = 'Teste';
        this.supervisorsCountOpen[index] = Math.floor(Math.random() * 20);
        this.supervisorsCountClosed[index] = Math.floor(Math.random() * 20);
      }

      this.loaded = true;
      this.barChartMethod();
    }, (error) => {
      console.log(error);
    });
  }

  barChartMethod() {
    const getOrCreateTooltip = (chart) => {
      let tooltipEl = chart.canvas.parentNode.querySelector('div');

      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';

        const table = document.createElement('table');
        table.style.margin = '0px';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
      }

      return tooltipEl;
    };

    const externalTooltipHandler = (context) => {
      // Tooltip Element
      const { chart, tooltip } = context;
      const tooltipEl = getOrCreateTooltip(chart);

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set Text
      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b) => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach((title) => {
          const tr = document.createElement('tr');
          tr.style.borderWidth = '0';

          const th = document.createElement('th');
          th.style.borderWidth = '0';
          const text = document.createTextNode(title);

          th.appendChild(text);
          tr.appendChild(th);
          tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body, i) => {
          const colors = tooltip.labelColors[i];

          const span = document.createElement('span');
          span.style.background = colors.backgroundColor;
          span.style.borderColor = colors.borderColor;
          span.style.borderWidth = '2px';
          span.style.marginRight = '10px';
          span.style.height = '10px';
          span.style.width = '10px';
          span.style.display = 'inline-block';

          const tr = document.createElement('tr');
          tr.style.backgroundColor = 'inherit';
          tr.style.borderWidth = '0';

          const td = document.createElement('td');
          td.style.borderWidth = '0';

          const text = document.createTextNode(body);

          td.appendChild(span);
          td.appendChild(text);
          tr.appendChild(td);
          tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot.firstChild) {
          tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
      }

      const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
      tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
      tooltipEl.style.font = tooltip.options.bodyFont.string;
      tooltipEl.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px`;
    };

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
            backgroundColor: '#00795F',
            hoverBackgroundColor: 'rgb(0, 121, 95, 0.6)',
            data: this.supervisorsCountOpen,
          },
          {
            label: 'Estágios encerrados',
            backgroundColor: '#3eae91',
            hoverBackgroundColor: 'rgb(62, 174, 145, 0.6)',
            data: this.supervisorsCountClosed,
          },
        ],
      },
      options: {
        interaction: {
          mode: 'index',
          intersect: true,
        },
        plugins: {
          title: {
            display: true,
            text: 'Alunos por Orientador',
            font: {
              family: "'Nunito', sans-serif",
              size: 30,
            },
          },
          tooltip: {
            enabled: false,
            position: 'nearest',
            external: externalTooltipHandler,
          },
          legend: {
            labels: {
              font: {
                family: "'Nunito', sans-serif",
                size: 15,
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
