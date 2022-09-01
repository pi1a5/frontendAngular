import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss'],
})
export class ProcessesListComponent implements OnInit {

  @Input() newProcess = false;
  @Output() selectProcess = new EventEmitter<string>();

  processes = ['Padrão', 'Acompanhamento', 'Aproveitamento', 'Equiparação', 'Exterior'];

  constructor() { }

  ngOnInit() {
  }

  sendProcessName(processName: string) {
    this.selectProcess.emit(processName);
  }

}
