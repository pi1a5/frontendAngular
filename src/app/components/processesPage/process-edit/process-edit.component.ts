import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-edit',
  templateUrl: './process-edit.component.html',
  styleUrls: ['./process-edit.component.scss'],
})
export class ProcessEditComponent implements OnInit {

  @Input() processData: any; 

  constructor() { }

  ngOnInit() {}

}
