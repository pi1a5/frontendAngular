/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() confirmedProcess: Object = undefined;

  @Output() goBack = new EventEmitter<boolean>();

  public formData;

  constructor() { }

  ngOnInit() {
    console.log(this.confirmedProcess);
  }

  sendGoBack() {
    this.goBack.emit();
  }

  saveProcess() {
    console.log(this.formData);
  }
}
