import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.page.html',
  styleUrls: ['./processes.page.scss'],
})
export class ProcessesPage implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  receiveProcessName($event) {
    console.log($event);
    
  }
}
