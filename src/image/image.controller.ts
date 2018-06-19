import { Controller, Post, UseInterceptors, FileInterceptor, UploadedFile, HttpCode, HttpStatus } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ImageDto } from "./dto";

@Controller('image')
export class ImageController {

    constructor(private readonly imageService: ImageService) { }

    @Post('upload')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('image'))
    public async upload(@UploadedFile() file: ImageDto): Promise<string[]> {
        return await this.imageService.upload(file);
    }

}