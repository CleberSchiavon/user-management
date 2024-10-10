import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UserLoginReturn} from '@repo/types'
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '~/modules/users/dto/create-user-dto';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(email: string, password: string):Promise<UserLoginReturn> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d'
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      access_token: accessToken
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByUsername(createUserDto.username);
    const existingEmail = await this.usersService.findOneByEmail(createUserDto.email);

    if (existingEmail || existingUser) {
      throw new UnauthorizedException('User already exists.');
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashPassword;
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
  
}