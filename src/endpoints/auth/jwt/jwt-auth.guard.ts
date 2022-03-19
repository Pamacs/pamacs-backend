import { SignedUser } from "@/model/SignedUser";
import { getIpFromRequest } from "@/util/security/GetIpFromReq";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as crypto from 'crypto';

@Injectable() 
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
        let req = this.getRequest(context);     // Get raw request
        let ip = getIpFromRequest(req);         // Get hashed ip

        if (err || !user || user.ip_address != ip) throw err || new UnauthorizedException();
        return user;
    }

    getRequest<T = any>(context: ExecutionContext): T {
        return context.switchToHttp().getRequest();
    }

}