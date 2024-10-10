import { OmitType } from '@nestjs/mapped-types'; 
import { BaseUser } from './base-user-dto.dto';

export class UpdateUserDto extends OmitType(BaseUser, ['password', 'confirmPassword'] as const) {
  updatedAt: Date;
}