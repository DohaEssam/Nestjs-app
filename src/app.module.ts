import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisConfigService, RedisOptions } from 'redis-options.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseOptions, DatabaseOptionsProvider } from 'database-options.constants';
import { CacheService } from './cache/cache.service';
import 'dotenv/config';


@Module({
  controllers: [AppController],
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      // mysql db configurations
      // useFactory: (configService: ConfigService) =>
      //   DatabaseOptions(configService),
      // inject: [ConfigService],
      useFactory: () => DatabaseOptions,
    }),
    AuthModule,
    ProfileModule,
    ConfigModule.forRoot(), // redis configurations
    CacheModule.registerAsync(RedisOptions), // redis configurations
    // CacheModule.registerAsync({
    //   useFactory: RedisOptions.useFactory,
    //   inject: [RedisConfigService],
    // }),
    CacheModule.register(), // Register CacheModule here
  ],
  providers: [   // that to apply golbally to  to every controller with @cache()
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    ConfigService,
    RedisConfigService,
    CacheService,
    //DatabaseOptionsProvider
  ],
})
export class AppModule {}


