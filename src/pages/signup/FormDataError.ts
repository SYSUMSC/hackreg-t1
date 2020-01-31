export default class FormDataError extends Error {
    constructor(message: string, public names: string[]) {
        super(message);
    }
}
