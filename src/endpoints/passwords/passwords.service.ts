import { ApiResponse, ResponseType } from '@/model/ApiResponse';
import { PasswordContainerDocument } from '@/model/PasswordContainer';
import { PasswordEntry, PasswordEntryDocument } from '@/model/PasswordEntry';
import { SignedUser } from '@/model/SignedUser';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as messages from 'messages';
import Config from '@/config';
import { generateString } from '@/util/security/StringGenUtil';
import { CharSets } from '@/util/security/CharSets';

@Injectable()
export class PasswordsService {

    constructor(
        @InjectModel("containers") private containerModel: Model<PasswordContainerDocument>,
        @InjectModel("passwords") private passwordModel: Model<PasswordEntryDocument>
    ) {}

    async getPasswords(id: string, user: SignedUser) {

        const dbContainer = await this.containerModel.findOne({owner_id: user.user_id, id: id});
        const containerPasswords = await this.passwordModel.find<PasswordEntry>({container_id: id}, '-_id -__v');

        switch (true) {

            case !dbContainer:
                return new ApiResponse(ResponseType.ERROR, messages.response.containers.all.contaier_not_found_error);
        }

        return new ApiResponse(ResponseType.SUCCESS, messages.response.passwords.get.success, {
            passwords: containerPasswords
        });

    }

    async addPasswords(data: {name: string, login_name: string, password: string, note: string, client_id: string}[], id: string, user: SignedUser) {

        const dbContainer = await this.containerModel.findOne({owner_id: user.user_id, id: id});
        const containerPasswords = await this.passwordModel.find<PasswordEntry>({container_id: id}, '-_id -__v');

        switch (true) {

            case !dbContainer:
                return new ApiResponse(ResponseType.ERROR, messages.response.containers.all.contaier_not_found_error);

            case containerPasswords.length + data.length > Config.limits.container_entry_limit:
                return new ApiResponse(ResponseType.ERROR, messages.response.passwords.add.too_many_passwords_error);
        }

        await data.forEach(async d => {

            console.log("XD")
            let dbObj = new this.passwordModel({
                name: d.name,
                id: generateString(CharSets.SLETTERS_BLETTERS_NUMBERS, Config.lengths.password_id),
                login_name: d.login_name,
                password: d.password,
                append_date: Math.floor(new Date().valueOf() / 1000),
                container_id: id,
                note: d.note,
                client_id: d.client_id
            })

            await dbObj.save();
        })

        return new ApiResponse(ResponseType.SUCCESS, messages.response.passwords.add.success);
    }


}
