import {
    applyDecorators,
    UseGuards,
    UseInterceptors,
    BadRequestException,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

export function UploadImage(maxSize: number, validTypes: string[]) {
    return applyDecorators(
        UseInterceptors(
            FileInterceptor('file', {
                fileFilter: (
                    req: Request,
                    file: Express.Multer.File,
                    cb: (error: Error | null, acceptFile: boolean) => void,
                ) => {
                    try {
                        if (file.size > maxSize) {
                            throw new BadRequestException('File is too large.');
                        }
                        if (!validTypes.includes(file.mimetype)) {
                            throw new BadRequestException('Invalid file type.');
                        }
                        cb(null, true);
                    } catch (error) {
                        cb(error, false);
                    }
                },
            }),
        ),
    );
}
