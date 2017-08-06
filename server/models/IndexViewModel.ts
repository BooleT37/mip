import TileModel from "./TileModel";

export default class IndexViewModel {
    developement: boolean;
    tiles: TileModel[];

    constructor(developement: boolean, tiles: TileModel[]) {
        this.developement = developement;
        this.tiles = tiles;
    }
}