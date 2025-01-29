import {
        CanActivate,
        ExecutionContext,
        Injectable,
        UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const rawCookies = request.headers.cookie; 
        if (!rawCookies) {
            throw new UnauthorizedException('No cookies found');
        }

        const cookies = Object.fromEntries(
            rawCookies.split('; ').map(cookie => cookie.split('='))
        );

        const sessionToken = cookies['session'];
        if (!sessionToken) {
            throw new UnauthorizedException('Session token missing');
        }

        try {
            const payload = await this.jwtService.verifyAsync(sessionToken, {
                secret: process.env.SECRET_KEY,
            });
            request['user'] = payload;
        }
        catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}