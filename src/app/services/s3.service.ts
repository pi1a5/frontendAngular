import { Injectable } from '@angular/core';
//import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  FOLDER = 'test/';
  BUCKET = 'pi1a5';

  constructor() { }

  private getS3Bucket(): any {
    const bucket = new S3(
      {
        accessKeyId: 'AKIA4VWXXQ5BD45EOVPK',
        secretAccessKey: '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',
        region: 'sa-east-1'
      }
    );

    return bucket;
  }

  async uploadFile(file: any) {
    const params = {
      Bucket: this.BUCKET,
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read'
    };

    try {
      const stored = await this.getS3Bucket().upload(params).promise();
      console.log(stored);
    } catch (error) {
      console.log(error);
    }

  }

  getFiles(): Observable<any> {
    const fileUploads = new Array();

    const params = {
      Bucket: this.BUCKET,
      Prefix: this.FOLDER
    };

    this.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }

      console.log('Successfully get files.', data);

      const fileDatas = data.Contents;

      fileDatas.forEach(function (file) {
        fileUploads.push({ KEY: file.Key, URL: 'https://s3-sa-east-1.amazonaws.com/' + params.Bucket + '/' + file.Key });
      });
    });

    return of(fileUploads);
  }
}