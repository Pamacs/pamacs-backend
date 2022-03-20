import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';

export type PasswordEntryDocument = PasswordEntry & Document;

@Schema()
export class PasswordEntry {

    @Prop() name: string;               // Could be a website, client could detect it by url
    @Prop() id: string;
    @Prop() password: Array<object>;    // only accepts base16 (hex) encoded strings
    @Prop() append_date: number;
    @Prop() note?: string;
    @Prop() client_id: string;          // used for dealing with compatibility issues over clients
}

export const PasswordEntrySchema = SchemaFactory.createForClass(PasswordEntry);