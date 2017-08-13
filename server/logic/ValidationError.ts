export default class ValidationError extends Error {
    readonly isValidationError: boolean;
    constructor(message: string) {
        super(message);
        this.isValidationError = true;
    }
}