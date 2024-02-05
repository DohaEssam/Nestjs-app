import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { redisStore } from 'cache-manager-redis-store';
// import * as redisStore from 'cache-manager-redis-store';
import * as CacheManager from 'cache-manager';
import * as RedisStore from 'cache-manager-redis-store';

@Injectable()
// ------------------- some helper function be used with redis ---------- //
export class RedisConfigService {
  constructor(private readonly configService: ConfigService) {}

  getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  getRedisPort(): number {
    return parseInt(this.configService.get<string>('REDIS_PORT')!);
  }

  // Add additional Redis-related functions if needed
}

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  //useFactory: async (redisConfigService: RedisConfigService) => {
  useFactory: async (configService: ConfigService) => {
    console.log('Inside useFactory');
    const store = await RedisStore.redisStore({
      socket: {
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        },
      });
      return {
      store: () => store,
      };
    },
  inject: [ConfigService],
  };
