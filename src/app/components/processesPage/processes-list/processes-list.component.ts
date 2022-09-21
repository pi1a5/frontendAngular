/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss'],
})
export class ProcessesListComponent implements OnInit {
  @Input() newProcess: boolean = false;

  @Input() processes: any[] = [];

  @Output() selectProcess = new EventEmitter<Object>();

  public loaded: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.processes.length > 0) return this.loaded = true;
  }

  sendProcess(process: any) {
    this.selectProcess.emit(process);
  }
}