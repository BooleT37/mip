import ITileDao from "./ITileDao";
import * as path from "path";
import * as fs from "fs";
import TileModel from "../models/TileModel";
import TileDataJsonModel from "../models/TileDataJsonModel";
import TileDataJsonValidator from "../logic/TileDataJsonValidator";
import JsonReader from "../logic/JsonReader";
import ValidationInfoBuilder from "../logic/ValidationInfoBuilder";

export default class FileTileDao implements ITileDao {
    private readonly TILES_DATA_DIR_NAME: string = "tiles_data";
    private readonly TILE_DATA_FILENAME: string = "data.json";
    private readonly TILES_DATA_DIR: string = path.resolve(process.cwd(), `${this.TILES_DATA_DIR_NAME}`);
    private readonly TILE_IMAGES_DIR_NAME: string = "images";
    private validationInfoBuilder: ValidationInfoBuilder;

    constructor() {
        this.validationInfoBuilder = new ValidationInfoBuilder();
    }
    getAll(): TileModel[] {
        const tiles: TileModel[] = [];
        
        var  dirs: string[] = null;
        try {
            dirs = fs.readdirSync(this.TILES_DATA_DIR, "utf8");
        } catch(e) {
            this.validationInfoBuilder.addBaseError(`отсутствует папка '${this.TILES_DATA_DIR_NAME}' (искали по пути '${this.TILES_DATA_DIR}'`);
        }

        if (dirs !== null) {
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
                            this.validationInfoBuilder.addFileError(
                                `${this.TILES_DATA_DIR_NAME}/${dir}/${this.TILE_DATA_FILENAME}`,
                                validationResult.errorMessage
                            );
                        }
                    } else {
                        this.validationInfoBuilder.addFolderError(`${this.TILES_DATA_DIR_NAME}/${dir}`, `В папке нет файла ${this.TILE_DATA_FILENAME}`);
                    }
                } else {
                    this.validationInfoBuilder.addBaseError(`Папка '${this.TILES_DATA_DIR_NAME}' содержит `
                    + `файл ${path.basename(currentPath)}. Папка ${this.TILES_DATA_DIR_NAME} `
                    + `может содержать только папки`);
                }
            }
            if (!this.validationInfoBuilder.areAnyErrors()) {
                return tiles;
            }
        }
        throw new Error(this.validationInfoBuilder.getValidationInfo());
    }
}