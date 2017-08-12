export default class TileDataModel {
    id: string;
    title: string;
    text: string;
    images: TileDataImageModel[];

    constructor(id: string, title: string, text: string, images: TileDataImageModel[]) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.images = images;
    }
}

export class TileDataImageModel {
    constructor(caption: string, filename: string) {
        this.caption = caption;
        this.filename = filename;
    }
    caption: string;
    filename: string;
}