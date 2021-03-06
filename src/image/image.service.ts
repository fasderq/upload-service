import { Injectable, HttpException, HttpCode, HttpStatus } from "@nestjs/common";
import { ImageDto } from "./dto";
import { read } from 'jimp';
import { v4 as uuid } from 'uuid';
import { ImageSize } from "..";
import { ajv } from ".";
import { imageSchema } from "./validation";

const DefaultUploadPath = './public/images';
const DefaultSizes: ImageSize[] = [
    {
        height: 100,
        width: 100
    }
]

@Injectable()
export class ImageService {

    readonly uploadPath: string = DefaultUploadPath;

    public async upload(file: ImageDto, sizes: Array<string> = []): Promise<string[]> {
        await this.validateImageFile(file);

        const image = await read(file.buffer);
        const token = uuid();
        const extension = image.getExtension();
        const originalPath = this.imagepath(token, extension);
        const imageUrls: string[] = [];

        imageUrls.push(originalPath.slice(8));

        if (sizes) {
            for (const size of sizes) {
                console.log(size);
            }
        }

        await image.write(originalPath);

        for (const defaultSize of DefaultSizes) {
            const croppedPath = this.imagepath(token, extension, `${defaultSize.width}x${defaultSize.height}`);
            await image
                .clone()
                .resize(defaultSize.width, defaultSize.height)
                .write(croppedPath);
            imageUrls.push(croppedPath.slice(8));
        }

        return imageUrls;
    }

    protected imagepath(token: string, extension: string, size: string = 'original'): string {
        return `${this.uploadPath}/${token.substr(0, 8)}/${token}_${size}.${extension}`;
    }

    protected async validateImageFile(file: ImageDto): Promise<void> {
        const validate = ajv.compile(imageSchema);
        const valid = validate(file);
        if (!valid) {
            console.log(validate.errors);
            throw new HttpException(validate.errors, HttpStatus.BAD_REQUEST);
        }
    }
}
