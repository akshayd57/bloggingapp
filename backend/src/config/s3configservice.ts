
import { Injectable } from "@nestjs/common";

import {ConfigService} from "@nestjs/config"

@Injectable()

export class S3ConfigService{

    constructor(private readonly configService:ConfigService){}

    getBucketName():string{

        return this.configService.get<string>('AWS_S3_BUCKET_NAME')
    }

    getRegion():string{

        return this.configService.get<string>('AWS_REGION')
    }

    getAccesskeyId():string{

        return this.configService.get<string>('AWS_ACCESS_KEY_ID')
    }

    getSecretAccessKey():string{

        return this.configService.get<string>('AWS_SECRET_ACCESS_KEY')
    }
}