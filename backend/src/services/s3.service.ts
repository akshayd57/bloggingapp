import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3ConfigService } from '../config/s3configservice';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;
  private readonly bucketName: string;

  constructor(private readonly s3ConfigService: S3ConfigService) {
    this.bucketName = this.s3ConfigService.getBucketName();
    this.s3 = new AWS.S3({
      region: this.s3ConfigService.getRegion(),
      accessKeyId: this.s3ConfigService.getAccesskeyId(),
      secretAccessKey: this.s3ConfigService.getSecretAccessKey(),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: `${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const data = await this.s3.upload(uploadParams).promise();
      console.log(data)
      return data.Location;
    } catch (error) {
      throw new Error('Error uploading file');
    }
  }
}

