import { PasswordContainerDocument } from '@/model/PasswordContainer';
import { SignedUser } from '@/model/SignedUser';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Config from '@/config';
import { CharSets } from '@/util/security/CharSets';
import { generateString } from '@/util/security/StringGenUtil';
import { ApiResponse, ResponseType } from '@/model/ApiResponse';
import * as messages from 'messages';

@Injectable()
export class ContainersService {

    constructor(
        @InjectModel("containers") private containerModel: Model<PasswordContainerDocument>,
    ) {}

    async getContainers(user: SignedUser) {
        return new ApiResponse(ResponseType.SUCCESS, messages.response.containers.get.success, {

            // Returning all user owned containers with the _id and __v fields removed
            containers: await this.containerModel.find({owner_id: user.user_id}, '-_id -__v')
        })
    }

    async createContainer(data: {name: string, note: string}, user: SignedUser): Promise<ApiResponse> {

        const userOwnedContainers = await this.containerModel.find({owner_id: user.user_id});

        switch (true) {
            case userOwnedContainers.length >= Config.limits.user_container_limit:
                return new ApiResponse(ResponseType.ERROR, messages.response.containers.create.too_many_containers_error);
        }

        const generatedContainerID = generateString(CharSets.SLETTERS_BLETTERS_NUMBERS, Config.lengths.container_id);

        const dbContainer = new this.containerModel({
            name: data.name ? data.name : undefined,
            owner_id: user.user_id,
            id: generatedContainerID,
            passwords: [],
            note: data.note ? data.note : undefined
        });
        await dbContainer.save();

        return new ApiResponse(ResponseType.SUCCESS, messages.response.containers.create.success, {
            id: generatedContainerID
        })
    }

    async deleteContainer(id: string, user: SignedUser): Promise<ApiResponse> {

        const dbContainer = await this.containerModel.findOne({owner_id: user.user_id, id: id});

        switch (true) {
            case !dbContainer:
                return new ApiResponse(ResponseType.ERROR, messages.response.containers.all.contaier_not_found_error);
        }

        await dbContainer.deleteOne();

        return new ApiResponse(ResponseType.SUCCESS, messages.response.containers.delete.success);
    }

    async editContainer(data: {name: string, note: string}, id: string, user: SignedUser): Promise<ApiResponse> {
        
        const dbContainer = await this.containerModel.findOne({owner_id: user.user_id, id: id});

        switch (true) {
            case !dbContainer:
                return new ApiResponse(ResponseType.ERROR, messages.response.containers.all.contaier_not_found_error);
        }

        Object.keys(data).forEach(e => {
            dbContainer[e] = data[e] ? data[e] : undefined;
        });

        await dbContainer.save();

        return new ApiResponse(ResponseType.SUCCESS, messages.response.containers.edit.success);
    }
    
}
