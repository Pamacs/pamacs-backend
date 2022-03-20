import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';

export type PasswordContainerDocument = PasswordContainer & Document;

@Schema()
export class PasswordContainer {

    @Prop() name: string;
    @Prop() owner_id: string;
    @Prop() id: string;
    @Prop() passwords: Array<object>;
}

export const PasswordContainerSchema = SchemaFactory.createForClass(PasswordContainer);