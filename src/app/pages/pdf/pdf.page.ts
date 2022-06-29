/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {
  pdfSrc = null;

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.url) {
        this.pdfSrc = params.url;
      }
    });
  }
}
