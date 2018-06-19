
export class ImageDto {
    readonly fieldname: string;
    readonly originalname: string;
    readonly encoding: string;
    readonly mimetype: string;
    readonly size: number;
    readonly buffer?: Buffer;
}