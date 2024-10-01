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

const isProductionEnviroment = process.env.development !== 'production'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchemaForEnv,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: !isProductionEnviroment,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, HealthController, AuthController,],
  providers: [HealthService, AuthService],
})
export class AppModule {}
