import TileModel from "../models/TileModel";
import TileDataModel from "../models/TileDataModel";

export default interface ITileDao {
    getAll(): TileModel[];
    getForId(id: string): TileDataModel;
}