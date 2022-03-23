import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';

export type PasswordEntryDocument = PasswordEntry & Document;

@Schema()
export class PasswordEntry {

    @Prop() name: string;               // Could be a website, client could detect it by url
    @Prop() id: string;
    @Prop() login_name: string;
    @Prop() password: string;    // only accepts base16 (hex) encoded strings
    @Prop() append_date: number;
    @Prop() container_id: string;
    @Prop() note: string;
    @Prop() client_id: string;          // used for dealing with compatibility issues over clients (because security depends on the client, not on the backend)
}

export const PasswordEntrySchema = SchemaFactory.createForClass(PasswordEntry);