import ITileDao from "./ITileDao";
import * as path from "path";
import * as fs from "fs";
import * as log4js from "log4js";
import TileModel from "../models/TileModel";
import TileDataJsonModel from "../models/TileDataJsonModel";
import TileDataJsonValidator from "../logic/TileDataJsonValidator";
import JsonReader from "../logic/JsonReader";

export default class FileTileDao implements ITileDao {
    private readonly TILES_DATA_DIR_NAME: string = "tiles_data";
    private readonly TILE_DATA_FILENAME: string = "data.json";
    private readonly TILES_DATA_DIR: string = path.resolve(__dirname, `../${this.TILES_DATA_DIR_NAME}`);
    private logger: log4js.Logger;

    constructor() {
        this.logger = log4js.getDefaultLogger();
    }
    getAll(): TileModel[] {
        const tiles: TileModel[] = [];
        const dirs: string[] = fs.readdirSync(this.TILES_DATA_DIR, "utf8");
        for (let dir of dirs) {
            const currentPath = path.resolve(this.TILES_DATA_DIR, dir);
            if (fs.statSync(currentPath).isDirectory()) {
                const dataFilePath = path.join(currentPath, this.TILE_DATA_FILENAME);
                if (fs.existsSync(dataFilePath)) {
                    var tileDataJson: TileDataJsonModel = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
                    var validationResult = TileDataJsonValidator.validate(tileDataJson);
                    if (!validationResult.error) {
                        var tile = JsonReader.TileFromJson(tileDataJson);
                        tiles.push(tile);
                    } else {
                        this.logger.error(`Ошибка при валидации ${dataFilePath}: ${validationResult.errorMessage}`);
                    }
                } else {
                    this.logger.error(`Нет файла ${this.TILE_DATA_FILENAME} в папке ${currentPath}`);
                }
            } else {
                this.logger.info(`Папка '${this.TILES_DATA_DIR_NAME}' содержит `
                  + `файл ${path.basename(currentPath)}. Папка ${this.TILES_DATA_DIR_NAME} `
                  + `может содержать только папки`);
            }
        }
        return tiles;
    }
}