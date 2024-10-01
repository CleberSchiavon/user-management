import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { validationSchemaForEnv } from './config/environment-variables';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';
import typeorm from './config/typeorm';

const isProductionEnviroment = process.env.development !== 'production'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchemaForEnv,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, HealthController, AuthController,],
  providers: [HealthService, AuthService],
})
export class AppModule {}
