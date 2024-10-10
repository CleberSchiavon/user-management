import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './strategy';
import { BaseUser } from '../users/dto/base-user-dto.dto';
import { CreateUserDto } from '../users/dto/create-user-dto';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login Route' })
  @ApiResponse({
    status: 200,
    type: [BaseUser],
  })
  login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'Signup Route' })
  @ApiResponse({
    status: 200,
    type: [BaseUser],
  })
  signup(@Body() signupDto: CreateUserDto) {
    const payload: CreateUserDto = {
      username: signupDto.username,
      email: signupDto.email,
      password: signupDto.password,
      phoneNumber: signupDto.phoneNumber,
      createdAt: new Date(),
    };
    return this.authService.signUp(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify-token')
  @ApiOperation({ summary: 'Verify Token Route' })
  @ApiResponse({
    status: 200,
    type: [BaseUser],
  })
  verifyToken(@Body() body: { token: string }) {
    return this.authService.verifyToken(body.token);
  }
}
