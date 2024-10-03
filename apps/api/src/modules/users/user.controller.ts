import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { BaseUser } from './dto/base-user-dto.dto';
import { UpdateUserDto } from './dto/update-user-dto.dto';
import { PageOptionsDto } from '../pagination/dto/PageOptions.dto';
import { PageDto } from '../pagination/dto/page.dto';
import { Users } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: [BaseUser],
  })
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Users>> {
    return this.usersService.findAll(pageOptionsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    type: BaseUser,
  })
  async findOne(@Param('id') id: number): Promise<BaseUser> {
    return await this.usersService.findOneById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })  
  @ApiResponse({
    status: 204,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number): Promise<void> {
    await this.usersService.update(id, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 204,
  })
  async remove(@Param('id') id: number): Promise<void> {
    await this.usersService.remove(id);
  }
}
