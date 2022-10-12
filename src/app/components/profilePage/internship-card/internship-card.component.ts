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
import { Component, OnInit } from '@angular/core';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-internship-card',
  templateUrl: './internship-card.component.html',
  styleUrls: ['./internship-card.component.scss'],
})
export class InternshipCardComponent implements OnInit {
  public internship = undefined;

  constructor(public apiStudent: ApiStudentService) { }

  ngOnInit() {
    this.apiStudent.getUserInternshipData().subscribe((data) => {
      console.log(data);
      this.internship = data[0];
    }, (error) => {
      console.log(error);
    });
  }
}
