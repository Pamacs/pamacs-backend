import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';

export type UserDocuemnt = User & Document;

@Schema()
export class User {
    // omg there is no username :o
    // i want to generate a random string of simple lower and uppercase english letters with the length of 64 and make the auth with only userid and password


    @Prop() user_id: string;
    @Prop() password: string;
    @Prop() register_key?: string;
    @Prop() register_date: number;
    @Prop() recovery_key: string;
}

export const UserSchema = SchemaFactory.createForClass(User);