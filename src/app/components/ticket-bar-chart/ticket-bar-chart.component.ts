/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
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
  Component, ElementRef, Input, OnInit, ViewChild,
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

  @Input() data = undefined;

  public months: any[] = [];

  public acceptedTickets: any[] = [];

  public refusedTickets: any[] = [];

  public year: string = '';

  constructor(
    public apiSupervisor: ApiSupervisorService,
  ) { }

  ngOnInit() {
    this.year = Object.entries(this.data)[0][0];
    for (const [key, value] of Object.entries(Object.entries(this.data)[0][1])) {
      this.months.push(key);
      this.acceptedTickets.push(value.aceito);
      this.refusedTickets.push(value.recusado);
    }
    this.pieChartMethod();
  }

  pieChartMethod() {
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
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Aceitos',
          data: this.acceptedTickets,
          backgroundColor: 'rgba(75, 192, 192)',
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Recusados',
          data: this.refusedTickets,
          backgroundColor: 'rgb(255, 99, 132)',
          hoverBackgroundColor: 'rgb(255, 99, 132, 0.6)',
        }],
      },
      options: {
        interaction: {
          mode: 'index',
          intersect: true,
        },
        plugins: {
          title: {
            display: true,
            text: this.year,
            font: {
              family: "'Nunito', sans-serif",
              size: 20,
            },
          },
          tooltip: {
            enabled: false,
            position: 'nearest',
            external: externalTooltipHandler
          },
          legend: {
            position: 'top',
            labels: {
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
        indexAxis: 'x',
        scales: {
          y: {
            stacked: true,
            ticks: {
              stepSize: 1,
              font: {
                family: "'Nunito', sans-serif",
              },
            },
          },
          x: {
            stacked: true,
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
