import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.page.html',
  styleUrls: ['./processes.page.scss'],
})
export class ProcessesPage implements OnInit {

  isNewProcess: boolean = false;
  selectedProcess = undefined;

  constructor() { }

  ngOnInit() {
  }

  newProcess() {
    this.isNewProcess = true;
    this.selectedProcess = 'Novo processo';
  }

  receiveProcessName($event) {
    console.log($event);
    this.selectedProcess = $event;
  }


}
