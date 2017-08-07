import TileModel, { BackgroundColor } from "../models/TileModel";
import TileDataJsonModel from "../models/TileDataJsonModel";
import { TileIcon } from "../models/Enums";

export default class JsonReader {
    static TileFromJson(tileDataJson: TileDataJsonModel): TileModel {
        const tile = tileDataJson.tile;
        return new TileModel(
            tile.backgroundFilename,
            tile.backgroundColor as BackgroundColor,
            tile.icons.map(icon => TileIcon[icon]),
            tile.caption
        );
    }
}