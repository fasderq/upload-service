import { Controller, Post, UseInterceptors, FileInterceptor, UploadedFile } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ImageDto } from "./dto";


@Controller('image')
export class ImageController {

    constructor(private readonly imageService: ImageService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    public async  upload(@UploadedFile() file: ImageDto) {
        const urls = await this.imageService.upload(file);

        return urls;
    }

}