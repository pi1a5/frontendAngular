import { Injectable } from '@angular/core';
//import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  FOLDER = localStorage.getItem('sub');
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
    var Key = `${this.FOLDER}/${new Date().getTime()}${file.name}`

    const params = {
      Bucket: this.BUCKET,
      Key: Key,
      Body: file,
      ACL: 'public-read'
    };

    try {
      const stored = await this.getS3Bucket().upload(params).promise();
      // console.log(stored);
      return Key;
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