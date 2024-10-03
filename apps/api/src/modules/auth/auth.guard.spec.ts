import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtAuthGuard } from './auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let jwtService: JwtService;
  let configService: ConfigService
  let reflector: Reflector;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    } as unknown as JwtService;

    configService = {
      get: jest.fn(),
    } as unknown as ConfigService;
    
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as Reflector;

    jwtAuthGuard = new JwtAuthGuard(jwtService, configService, reflector);
  });

  describe('canActivate', () => {
    it('should return true for public endpoints', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({} as Request), 
        }),
        getHandler: () => ({}),
        getClass: () => ({}),
      } as unknown as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      const result = await jwtAuthGuard.canActivate(context);
      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException when authorization token is missing', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: undefined,
            },
          } as Request),
        }),
        getHandler: () => ({}),
        getClass: () => ({}),
      } as unknown as ExecutionContext;

      await expect(jwtAuthGuard.canActivate(context)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when authorization token is invalid', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: 'Bearer invalid_token',
            },
          } as Request), 
        }),
        getHandler: () => ({}),
        getClass: () => ({}),
      } as unknown as ExecutionContext;

      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error());

      await expect(jwtAuthGuard.canActivate(context)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should return true when authorization token is valid', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: 'Bearer valid_token',
            },
          } as Request), 
        }),
        getHandler: () => ({}),
        getClass: () => ({}),
      } as unknown as ExecutionContext;

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({ userId: 1 });

      const result = await jwtAuthGuard.canActivate(context);
      expect(result).toBe(true);
    });
  });

  describe('extractTokenFromAuthorizationHeader', () => {
    it('should return the token from the authorization header', () => {
      const request = {
        headers: {
          authorization: 'Bearer valid_token',
        },
      } as Request; 

      const token = jwtAuthGuard['extractTokenFromAuthorizationHeader'](request);
      expect(token).toBe('valid_token');
    });

    it('should return undefined when authorization header is missing', () => {
      const request = {
        headers: {
          authorization: undefined,
        },
      } as Request; 

      const token = jwtAuthGuard['extractTokenFromAuthorizationHeader'](request);
      expect(token).toBeUndefined();
    });
  });
});