import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss'],
})
export class ProcessesListComponent implements OnInit {

  @Input() newProcess: boolean = false;
  @Input() processes: any[] = [];
  @Output() selectProcess = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
  }

  sendProcess(process: any) {
    this.selectProcess.emit(process);
  }

}
