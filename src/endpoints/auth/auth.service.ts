import Config from '@/config';
import { ApiResponse, ResponseType } from '@/model/ApiResponse';
import { UserDocuemnt } from '@/model/User';
import { hashPassword } from '@/util/security/HashUtil';
import { generateString } from '@/util/security/StringGenUtil';
import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as messages from 'messages';
import { JwtService } from '@nestjs/jwt';
import { CharSets } from '@/util/security/CharSets';
import { SignedUser } from '@/model/SignedUser';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel("users") private userModel: Model<UserDocuemnt>,
        private JwtService: JwtService
    ) {}

    async register(data: {password: string, register_key?: string}): Promise<ApiResponse> {
        
        const generatedUserID = generateString(CharSets.SLETTERS_BLETTERS_NUMBERS, Config.lengths.user_id);
        const recovery_key = generateString(CharSets.SLETTERS_BLETTERS_NUMBERS, Config.lengths.recovery_key);

        const newUser = new this.userModel({
            user_id: generatedUserID,
            password: hashPassword({user_id: generatedUserID, password: data.password}),
            register_key: data.register_key,
            register_date: Math.floor(new Date().valueOf() / 1000),
            recovery_key: recovery_key
        });

        await newUser.save();

        return new ApiResponse(ResponseType.SUCCESS, messages.response.auth.register.success, {
            user_id: generatedUserID,
            recovery_key: recovery_key
        });
    }

    async login(data: {user_id: string, password: string}, ip: string): Promise<ApiResponse> {
        const dbUser = await this.userModel.findOne({user_id: data.user_id});

        // Password is still in plaintext, can't check it yet
        const hashedPass = hashPassword(data);
        // well now we can, yay

        if (dbUser && dbUser.password == hashedPass) {
            // Transforming the class into a plain object because jwt only accepts that
            const { ...signed_user} =
                new SignedUser(
                    data.user_id,
                    ip,
                    hashPassword({ user_id: data.user_id, password: data.password })
                );

            return new ApiResponse(ResponseType.SUCCESS, messages.response.auth.login.success, {
                    access_token: this.JwtService.sign(signed_user)
                });
        }
        return new ApiResponse(ResponseType.ERROR, messages.response.auth.login.credential_error);
    }

    // skidded from official documentation, feelin' good
    async validateUser(user_id: string, pass: string) {
        const dbUser = await this.userModel.findOne({user_id: user_id});

        if (dbUser && dbUser.password == pass) {
            dbUser.password = undefined;
            return dbUser;
        }
        return null;
    }

}
