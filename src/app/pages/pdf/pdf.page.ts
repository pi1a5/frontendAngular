import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {

  pdfSrc = "https://s3-sa-east-1.amazonaws.com/pi1a5/test/ComprovanteVacinacao.pdf"

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.api.getPdfUrl(params.id).subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        })
      }
    });
  }

}
