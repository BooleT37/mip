import TileDataJsonModel, { TileJsonModel, TileContentJsonModel } from "../models/TileDataJsonModel";
import { TileIcon } from "../models/Enums";

interface ValidationResult {
    error: boolean;
    errorMessage?: string;
}

export default class TileDataJsonValidator {
    static validate(model: TileDataJsonModel): ValidationResult {
        var result: ValidationResult = { error: false, errorMessage: "" };

        let validationResult: ValidationResult = this.validateTile(model.tile);
        if (validationResult.error) {
            result.errorMessage += `Ошибки в свойстве "tile": ${validationResult.errorMessage}`;
            result.error = true;
        }

        validationResult = this.validateContent(model.content);
        if (validationResult.error) {
            result.errorMessage += `Ошибки в свойстве "content": ${validationResult.errorMessage}`;
            result.error = true;
        }

        return result;
    }

    private static validateTile(tile: TileJsonModel): ValidationResult {
        var result: ValidationResult = { error: false };
        var errorMessages: string[] = [];

        let validationResult: ValidationResult = this.validateBackgroundFilename(tile.backgroundFilename);
        if (validationResult.error) {
            errorMessages.push(validationResult.errorMessage);
            result.error = true;
        }

        validationResult = this.validateBackgroundColor(tile.backgroundColor);
        if (validationResult.error) {
            errorMessages.push(validationResult.errorMessage);
            result.error = true;
        }

        tile.icons.forEach(icon => {
            let res = this.validateIcon(icon);
            if (res.error) {
                errorMessages.push(res.errorMessage);
                result.error = true;
            }
        });

        validationResult = this.validateCaption(tile.caption);
        if (validationResult.error) {
            errorMessages.push(validationResult.errorMessage);
            result.error = true;
        }

        validationResult = this.validateFontSize(tile.fontSize);
        if (validationResult.error) {
            errorMessages.push(validationResult.errorMessage);
            result.error = true;
        }

        result.errorMessage = errorMessages.join("; ");
        return result;
    }

    private static validateContent(content: TileContentJsonModel): ValidationResult {
        var result: ValidationResult = { error: false };
        var errorMessages: string[] = [];

        let validationResult: ValidationResult = this.validateTitle(content.title);
        if (validationResult.error) {
            errorMessages.push(validationResult.errorMessage);
            result.error = true;
        }

        result.errorMessage = errorMessages.join("; ");
        return result;
    }

    private static validateBackgroundFilename(backgroundFilename: string): ValidationResult {
        if (backgroundFilename === null || backgroundFilename === undefined) {
            return {
                error: true,
                errorMessage: `Свойство "backgroundFilename" не может быть '${backgroundFilename.toString()}'`
            };
        }
        if (backgroundFilename.length === 0) {
            return {
                error: true,
                errorMessage: "Длина свойства \"backgroundFilename\" должна быть "
            };
        }
        return {
            error: false
        }
    }

    private static validateBackgroundColor(backgroundColor: string): ValidationResult {
        var availibleColors = ["Blue", "Red", "Green"];
        if (availibleColors.indexOf(backgroundColor) === -1) {
            return {
                error: true,
                errorMessage: `Свойство \"backgroundFilename\" должно быть одним из значений `
                  + `"Blue", "Red" или "Green". Сейчас оно '${backgroundColor}'`
            };
        }
        return { error: false };
    }

    private static validateIcon(icon: string): ValidationResult {
        if (!TileIcon[icon]) {
            let availibleIcons: string = Object.keys(TileIcon).join(", ");
            return {
                error: true,
                errorMessage: `Иконка в массиве "icons" должна быть одним из значений `
                  + `${availibleIcons}. Сейчас она '${icon}'`
            };
        }
        
        return { error: false };
    }

    private static validateCaption(caption: string): ValidationResult {
        if (!isNotEmptyString(caption)) {
            return {
                error: true,
                errorMessage: "Свойство \"caption\" не может быть пустым"
            };
        }
        return { error: false };
    }

    private static validateFontSize(fontSize: string): ValidationResult {
        const availibleFontSizes = ["small", "medium", "big"];
        if (!fontSize) {
            return { error: false };
        }
        if (availibleFontSizes.indexOf(fontSize) === -1) {
            return {
                error: true,
                errorMessage: `Свойство \"fontSize\" должно быть одним из значений `
                  + `"small", "medium" или "big". Сейчас оно '${fontSize}'`
            };
        }
        return { error: false };
    }

    private static validateTitle(title: string): ValidationResult {
        if (!isNotEmptyString(title)) {
            return {
                error: true,
                errorMessage: "Свойство \"title\" не может быть пустым"
            };
        }
        return { error: false };
    }
    
}

function isNotEmptyString(str: string) {
    return str !== undefined && str !== null && str.length > 0;
}