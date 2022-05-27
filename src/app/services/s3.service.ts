import { Injectable } from '@angular/core';
//import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  FOLDER = localStorage.getItem('sub');
  BUCKET = environment.bucket;

  constructor() { }

  private getS3Bucket(): any {
    const bucket = new S3(
      {
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
        region: environment.region
      }
    );

    return bucket;
  }

  async uploadFile(file: any) {
    var KEY = `${this.FOLDER}/${new Date().getTime()}${file.name}`

    const params = {
      Bucket: this.BUCKET,
      Key: KEY,
      Body: file,
      ACL: 'public-read'
    };

    try {
      const stored = await this.getS3Bucket().upload(params).promise();
      // console.log(stored);
      return KEY;
    } catch (error) {
      console.log(error);
      return false;
    }

  }

  async getFiles() {
    return this.getS3Bucket().listObjects({
      Bucket: this.BUCKET,
      Prefix: this.FOLDER
    }).promise();
  }
}