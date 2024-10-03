import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthReturnType } from '~/types/Health/';
import { Public } from '../auth/strategy';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  @ApiTags('health')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Caso receba o statusCode 200, a API está ativa!',
    type: HealthReturnType,
  })
  @Get('')
  @Public()
  checkApiHealth() {
    return this.healthService.checkApiHealth();
  }
}
