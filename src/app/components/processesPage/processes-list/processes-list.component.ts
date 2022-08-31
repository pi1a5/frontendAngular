import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss'],
})
export class ProcessesListComponent implements OnInit {

  @Output() selectProcess = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  sendProcessName(processName: string) {
    
    this.selectProcess.emit(processName);
  }

}
