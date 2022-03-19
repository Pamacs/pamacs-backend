import { UserSchema } from '@/model/User';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import 'dotenv/config';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: "users", schema: UserSchema }
            ]
        ),
        JwtModule.register({
            secret: process.env.JWT_PRIVATE_KEY,
            signOptions: {
                expiresIn: '2d'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
