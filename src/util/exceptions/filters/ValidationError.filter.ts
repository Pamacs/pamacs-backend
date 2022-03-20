import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ValidationError } from "../ValidationError";
import { Response } from 'express';
import { ApiResponse, ResponseType } from "@/model/ApiResponse";
import * as messages from 'messages';

// this is so cool
@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
    catch(e: ValidationError, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();

        res.status(e.getStatus()).json(new ApiResponse(ResponseType.ERROR, messages.response.validation_error))
    }
}