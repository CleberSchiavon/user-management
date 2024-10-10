import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './strategy';
import { Users } from '../users/entities/user.entity';

export interface RequestWithUser extends Request {
  user: Users;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicEndpoint = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicEndpoint) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authToken = this.extractTokenFromAuthorizationHeader(request);
    const jwtSecretKey = this.configService.get('API_JWT_SECRET');

    if (!authToken) {
      throw new UnauthorizedException('Authorization token is missing.');
    }

    try {
      const userPayload = await this.jwtService.verifyAsync(authToken, {
        secret: jwtSecretKey,
      });
      request.user = userPayload;
    } catch (error) {
      throw new UnauthorizedException('Invalid authorization token.');
    }

    return true;
  }

  private extractTokenFromAuthorizationHeader(
    request: Request,
  ): string | undefined {
    const authorizationHeader = request.headers.authorization;
    const [scheme, token] = authorizationHeader?.split(' ') ?? [];
    return scheme === 'Bearer' ? token : undefined;
  }
}
