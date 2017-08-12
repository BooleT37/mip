import * as fs from "fs";
import * as path from "path";

export default class Logger {
    private static readonly FILE_NAME: string = "logs.txt";
    private static readonly FILE_PATH: string = path.join(process.cwd(), Logger.FILE_NAME);
    static log(message: string) {
        fs.appendFileSync(this.FILE_PATH, `[${new Date().toISOString()}] - ${message}\n`);
    }
}