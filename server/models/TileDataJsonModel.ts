export default interface TileDataJsonModel {
    tile: TileJsonModel;
    content: TileContentJsonModel;
}

export interface TileJsonModel {
    backgroundFilename: string;
    backgroundColor: string;
    icons: string[];
    caption: string;
    fontSize?: string;
}

export interface TileContentJsonModel {
    title: string;
}