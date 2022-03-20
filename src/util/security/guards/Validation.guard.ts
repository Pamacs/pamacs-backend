import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from 'express';
import { ValidationError } from "@/util/exceptions/ValidationError";

@Injectable()
export class ValidationGuard implements CanActivate {

    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const body = context.switchToHttp().getRequest<Request>().body;
        const validatorFunction = this.reflector.get<Function>('validatorFunction', context.getHandler());

        if (!validatorFunction) return true;

        // Executes the validator we get from parameters
        const { error } = validatorFunction(body);

        if (error) throw new ValidationError();
        return true;
    }
}