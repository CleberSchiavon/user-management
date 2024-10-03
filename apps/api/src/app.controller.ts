import { Controller, Get } from '@nestjs/common';
import { HealthService } from './modules/health/health.service';

@Controller()
export class AppController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async getHealth(): Promise<{ message: string }> {
    return this.healthService.checkApiHealth();
  }
}
