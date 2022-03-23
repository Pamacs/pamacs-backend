import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';
import { PasswordEntry } from "./PasswordEntry";

export type PasswordContainerDocument = PasswordContainer & Document;

@Schema()
export class PasswordContainer {

    @Prop() name: string;
    @Prop() owner_id: string;
    @Prop() id: string;
    @Prop() passwords: string[]; // Storing password object id-s
    @Prop() note: string;
}

export const PasswordContainerSchema = SchemaFactory.createForClass(PasswordContainer);