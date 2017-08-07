export default class TileDataModel {
    title: string;
    text: string;
    images: TileDataImageModel[];

    constructor(title: string, text: string, images: TileDataImageModel[]) {
        this.title = title;
        this.text = text;
        this.images = images;
    }
}

export class TileDataImageModel {
    caption: string;
    filename: string;
}