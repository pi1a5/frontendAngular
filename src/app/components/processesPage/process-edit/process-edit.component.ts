import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-process-edit',
  templateUrl: './process-edit.component.html',
  styleUrls: ['./process-edit.component.scss'],
})
export class ProcessEditComponent implements OnInit {

  @Input() newProcess: boolean = false; 
  @Input() processData: any; 
  @Output() cancelNewProcess = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  sendCancel() {
    this.cancelNewProcess.emit();
  }

}
