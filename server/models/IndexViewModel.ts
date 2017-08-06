import TileModel from "./TileModel";

export default class IndexViewModel {
    production: boolean;
    tiles: TileModel[];

    constructor(production: boolean, tiles: TileModel[]) {
        this.production = production;
        this.tiles = tiles;
    }
}