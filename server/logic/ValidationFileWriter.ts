import * as path from "path";
import * as fs from "fs";
import * as log4js from "log4js";

//todo обработать случаи параллельных записей в файл
export default class ValidationFileWriter {
    private readonly FILE_NAME = "validationErrors.txt";
    private readonly FILE_PATH = path.resolve(__dirname, `../../${this.FILE_NAME}`);
    private logger: log4js.Logger = null;

    constructor() {
        this.logger = log4js.getLogger();
    }

    removeFile() {
        try {
            fs.unlinkSync(this.FILE_PATH);
        } catch (e) {
            if (e.code !== "ENOENT") {
                this.logError(e);
            }
        }
    }

    write(string: string) {
        try {
            fs.writeFileSync(this.FILE_PATH, string)
        }
        catch (e) {
            this.logError(e);
        }
    }
    
    private logError(e: any): void {
        console.error(e);
        this.logger.debug(e);
    }
}