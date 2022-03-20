import { HttpException, HttpStatus } from "@nestjs/common";
import * as messages from 'messages';

export class ValidationError extends HttpException {
    constructor() {
        super(messages.response.validation_error, HttpStatus.I_AM_A_TEAPOT);
    }
}