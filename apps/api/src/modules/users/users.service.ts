import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user-dto.dto';
import { PageDto } from '../pagination/dto/page.dto';
import { PageOptionsDto } from '../pagination/dto/PageOptions.dto';
import { PageMetaDto } from '../pagination/dto/PageMeta.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  async findAll(paginationOptions: PageOptionsDto): Promise<PageDto<Users>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder
      .select([
        'user.id',
        'user.username',
        'user.email',
        'user.createdAt',
        'user.updatedAt',
      ])
      .orderBy('user.createdAt', paginationOptions.order)
      .skip(paginationOptions.skip)
      .take(paginationOptions.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const metaDto = new PageMetaDto({ itemCount, paginationOptions });
    return new PageDto(entities, metaDto);
  }
  async findOneById(id: number): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }
  async findOneByEmail(email: string): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  async findOneByUsername(username: string): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const existingUserWithEmail = await this.userRepository.findOne({
      where: { email: updateUserDto.email },
    });
    const existingUserWithUsername = await this.userRepository.findOne({
      where: { username: updateUserDto.username },
    });
    const existingUserWithPhoneNumber = await this.userRepository.findOne({
      where: { phoneNumber: updateUserDto.phoneNumber },
    });

    if (existingUserWithEmail && existingUserWithEmail.id !== user.id) {
      throw new UnauthorizedException('Email já cadastrado');
    }
    if (existingUserWithUsername && existingUserWithUsername.id !== user.id) {
      throw new UnauthorizedException('Username já cadastrado');
    }
    if (
      existingUserWithPhoneNumber &&
      existingUserWithPhoneNumber.id !== user.id
    ) {
      throw new UnauthorizedException('Telefone já cadastrado');
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.phoneNumber) {
      user.phoneNumber = updateUserDto.phoneNumber;
    }

    return await this.userRepository.save(user);
  }
  async create(createUserDto: CreateUserDto) {
    const user = new Users();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.phoneNumber = createUserDto.phoneNumber;
    return await this.userRepository.save(user);
  }
  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return await this.userRepository.remove(user);
  }
}
