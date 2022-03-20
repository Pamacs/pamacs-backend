import { SetMetadata } from "@nestjs/common";

export const Validator = (validatorFunction: Function) => SetMetadata('validatorFunction', validatorFunction);