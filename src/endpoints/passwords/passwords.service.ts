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
import { CharSets, consistsOnlyOf } from '@/util/security/CharSets';

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
        let invalidPasswords: number[] = []; // Passwords that are not encrypted ones

        // Linear, sync check because we need indexes
        for (let i in data) {
            if (!consistsOnlyOf(CharSets.HEX, data[i].password)) invalidPasswords.push(parseInt(i));
        }

        switch (true) {

            case !dbContainer:
                return new ApiResponse(ResponseType.ERROR, messages.response.containers.all.contaier_not_found_error);

            case containerPasswords.length + data.length > Config.limits.container_entry_limit:
                return new ApiResponse(ResponseType.ERROR, messages.response.passwords.add.too_many_passwords_error);

            case invalidPasswords.length > 0:
                return new ApiResponse(ResponseType.ERROR, messages.response.passwords.all.passwords_not_encrypted_error, {
                    indexes: invalidPasswords
                })
        }

        await data.forEach(async d => {

            let generatedID = generateString(CharSets.SLETTERS_BLETTERS_NUMBERS, Config.lengths.password_id);

            let dbObj = new this.passwordModel({
                name: d.name,
                id: generatedID,
                login_name: d.login_name,
                password: d.password,
                append_date: Math.floor(new Date().valueOf() / 1000),
                container_id: id,
                note: d.note,
                client_id: d.client_id
            })

            dbContainer.passwords.push(generatedID);
            await dbObj.save();
        });
        await dbContainer.save();

        return new ApiResponse(ResponseType.SUCCESS, messages.response.passwords.add.success);
    }

    // This is ugly af
    async editPassword(data: {name: string, login_name: string, password: string, note: string, client_id: string}, id: string, user: SignedUser) {

        // Getting all user owned containers
        const allUserOwnedContainers = await this.containerModel.find({owner_id: user.user_id});
        // Making an undefined object for late assignment
        let foundDbPwObject: PasswordEntryDocument = undefined;
        
        // Looping through all user owned containers
        for (let dbContainer of allUserOwnedContainers) {
            // Checking if the user owns the password with the defined id
            if (dbContainer.passwords.includes(id)) {
                foundDbPwObject = await this.passwordModel.findOne({id: id});
            }
            // ^^ if they do, assign it to the object
        }

        switch (true) {
            case foundDbPwObject == undefined:
                return new ApiResponse(ResponseType.ERROR, messages.response.passwords.all.password_not_found_error);
            
            case data.password && !consistsOnlyOf(CharSets.HEX, data.password):
                return new ApiResponse(ResponseType.ERROR, messages.response.passwords.all.passwords_not_encrypted_error);
        }

        Object.keys(data).forEach(e => {
            foundDbPwObject[e] = data[e] ? data[e] : undefined;
        });

        await foundDbPwObject.save();
        return new ApiResponse(ResponseType.SUCCESS, messages.response.passwords.edit.success);
    }

}
