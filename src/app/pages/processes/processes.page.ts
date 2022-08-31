import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.page.html',
  styleUrls: ['./processes.page.scss'],
})
export class ProcessesPage implements OnInit {

  selectedProcess = undefined;

  constructor() { }

  ngOnInit() {
  }

  receiveProcessName($event) {
    console.log($event);
    this.selectedProcess = $event;
  }
}
