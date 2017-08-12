interface ErrorsDictionary {
    [key: string]: string[];
}

export default class ValidationInfoBuilder {
    private baseErrors: string[];
    private folderErrors: ErrorsDictionary;
    private fileErrors: ErrorsDictionary;
    private anyErrors: boolean;

    constructor() {
        this.baseErrors = [];
        this.folderErrors = {};
        this.fileErrors = {};
        this.anyErrors = false;
    }

    addBaseError(message: string): void {
        this.baseErrors.push(message);
        this.anyErrors = true;
    }

    addFolderError(folderName: string, message: string): void {
        if (!(folderName in this.folderErrors)) {
            this.folderErrors[folderName] = [];
        }
        this.folderErrors[folderName].push(message);
        this.anyErrors = true;
    }

    addFileError(fileName: string, message: string): void {
        if (!(fileName in this.fileErrors)) {
            this.fileErrors[fileName] = [];
        }
        this.fileErrors[fileName].push(message);
        this.anyErrors = true;
    }

    getValidationInfo(): string {
        var res: string = "";
        for (let error of this.baseErrors) {
            res = this.addLine(res, error);
        }
        for (let key in this.folderErrors) {
            if (this.folderErrors.hasOwnProperty(key)) {
                res = this.addLine(res, `Ошибки в папке ${key}:`);
                for (let error of this.folderErrors[key]) {
                    res = this.addLineWithIndent(res, error, 1)
                }
            }
        }
        for (let key in this.fileErrors) {
            if (this.fileErrors.hasOwnProperty(key)) {
                res = this.addLineWithIndent(res, `Ошибки в файле ${key}:`, 1);
                for (let error of this.fileErrors[key]) {
                    res = this.addLineWithIndent(res, error, 2)
                }
            }
        }
        return res;
    }

    areAnyErrors(): boolean {
        return this.anyErrors
    }

    private addLineWithIndent(string: string, line: string, indentLevel: number) {
        return string.concat(this.indentString(line, indentLevel).concat("\n"));
    }

    private addLine(string: string, line: string) {
        return string.concat(line.concat("\n"));
    }

    private indentString(string: string, level: number) {
        var indent = "";
        for (let i=0; i<level; i++) {
            indent += "    ";
        }
        return indent + string;
    }
}