import { CharSets, consistsOnlyOf } from "@/util/security/CharSets";
import * as crypto from 'crypto';
import { UserDocuemnt } from "./User";

export class SignedUser {

    user_id: string;
    ip_address: string; // Hashed ip address
    password: string; // Hashed password

    constructor(uid: string, ia: string, p: string) {
        this.user_id = uid;

        // All hashed at signing <
        this.ip_address = ia;
        this.password = p;
        // >
    }
}
