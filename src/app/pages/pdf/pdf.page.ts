import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {

  pdfSrc = "https://s3-sa-east-1.amazonaws.com/pi1a5/test/ComprovanteVacinacao.pdf"

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.url) {
       this.pdfSrc = params.url;
      }
    });
  }

}
