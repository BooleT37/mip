import ITileDao from "./ITileDao";
import * as path from "path";
import * as fs from "fs";
import TileModel from "../models/TileModel";
import TileDataJsonModel from "../models/TileDataJsonModel";
import TileDataJsonValidator from "../logic/TileDataJsonValidator";
import JsonReader from "../logic/JsonReader";
import ValidationInfoBuilder from "../logic/ValidationInfoBuilder";
import TileDataModel, { TileDataImageModel } from "../models/TileDataModel";
import ValidationError from "../logic/ValidationError";

export default class FileTileDao implements ITileDao {
    private readonly TILES_DATA_DIR_NAME: string = "tiles_data";
    private readonly TILE_DATA_FILENAME: string = "data.json";
    private readonly TILES_DATA_DIR: string = path.resolve(process.cwd(), `${this.TILES_DATA_DIR_NAME}`);
    private readonly TILE_IMAGES_DIR_NAME: string = "images";
    private readonly TILE_TEXT_FILE_NAME: string = "text.txt";
    private validationInfoBuilder: ValidationInfoBuilder;

    constructor() {
        this.validationInfoBuilder = new ValidationInfoBuilder();
    }
    getForId(id: string): TileDataModel {
        const folder: string = path.join(this.TILES_DATA_DIR, id);
        const dataFilePath = path.join(folder, this.TILE_DATA_FILENAME);
        var tileDataJson: TileDataJsonModel = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
        const title: string = tileDataJson.content.title;

        const textFilePath = path.join(folder, this.TILE_TEXT_FILE_NAME);
        var text: string = "";
        try {
            text = fs.readFileSync(textFilePath, "utf8");
        } catch(e) {
            //если text.txt отсутствует - ничего страшного
        }

        const images: TileDataImageModel[] = [];

        var imageFiles: string[];
        var imagesDir = path.join(folder, this.TILE_IMAGES_DIR_NAME);
        try {
            imageFiles = fs.readdirSync(imagesDir, "utf8");
            for (let imageName of imageFiles) {
                images.push(new TileDataImageModel(imageName.substring(0, imageName.lastIndexOf(".")), imageName));
            }
        } catch(e) {
        }
        return new TileDataModel(id, title, text, images);
    }
    getAll(): TileModel[] {
        const tiles: TileModel[] = [];
        
        var  dirs: string[] = null;
        try {
            dirs = fs.readdirSync(this.TILES_DATA_DIR, "utf8");
        } catch(e) {
            this.validationInfoBuilder.addBaseError(`отсутствует папка '${this.TILES_DATA_DIR_NAME}' (искали по пути '${this.TILES_DATA_DIR}')`);
        }

        if (dirs !== null) {
            for (let dir of dirs) {
                const currentPath = path.resolve(this.TILES_DATA_DIR, dir);
                if (fs.statSync(currentPath).isDirectory()) {
                    const dataFilePath = path.join(currentPath, this.TILE_DATA_FILENAME);
                    if (fs.existsSync(dataFilePath)) {
                        var tileDataJson: TileDataJsonModel;
                        try {
                            tileDataJson = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
                        } catch (e) {
                            this.validationInfoBuilder.addFileError(
                                `${this.TILES_DATA_DIR_NAME}/${dir}/${this.TILE_DATA_FILENAME}`,
                                e
                            );
                            continue;
                        }
                        var validationResult = TileDataJsonValidator.validate(tileDataJson);
                        if (!validationResult.error) {
                            var tile = JsonReader.TileFromJson(dir, tileDataJson);
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
        throw new ValidationError(this.validationInfoBuilder.getValidationInfo());
    }
}