/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.scss'],
})
export class CircularProgressBarComponent implements OnInit {
  @Input() progressEndValue: number = 0;

  public progressValue: number = 0;

  public speed: number = 10;

  constructor() { }

  ngOnInit() {
    const progressBar = document.querySelector('.circular-progress') as HTMLElement | null;
    const valueContainer = document.querySelector('.value-container');
    const progress = setInterval(() => {
      if (this.progressValue === this.progressEndValue) return clearInterval(progress);
      this.progressValue++;
      valueContainer.textContent = `${this.progressValue}%`;
      progressBar.style.background = `conic-gradient(
        #3eae91 ${this.progressValue * 3.6}deg,
        #b1ded3 ${this.progressValue * 3.6}deg
      )`;
    }, this.speed);
  }
}
