import TileModel from "../models/TileModel";

export default interface ITileDao {
    getAll(): TileModel[];
}