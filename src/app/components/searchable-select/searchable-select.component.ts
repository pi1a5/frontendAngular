/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges,
} from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent implements OnInit {
  @Input() documents: any;

  @Input() selected = [];

  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  isOpen = false;

  filtered = [];

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.filtered = this.documents;
    this.clearCheckedDocuments();
    this.loadCheckedDocuments();
  }

  clearCheckedDocuments() {
    this.documents.map((doc) => doc.selected = false);
  }

  loadCheckedDocuments() {
    for (let index = 0; index < this.selected.length; index++) {
      this.documents.map((doc) => {
        if(doc.id === this.selected[index].id) return doc.selected = true;
      });
    }
  }

  open() {
    this.isOpen = true;
  }

  cancel() {
    this.isOpen = false;
  }

  select() {
    const selected = this.documents.filter((doc) => doc.selected);
    this.selected = selected;
    this.isOpen = false;
    this.selectedChanged.emit(this.selected);
  }

  documentSelected() {
    this.selected = this.documents.filter((doc) => doc.selected);
  }

  filter(event: SearchbarCustomEvent) {
    const filter = event.detail.value.toLowerCase();
    this.filtered = this.documents.filter((doc) => doc.nome.toLowerCase().indexOf(filter) >= 0);
  }
}
