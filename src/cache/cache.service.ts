import { Injectable, Inject } from '@nestjs/common';
// import { CACHE_MANAGER, Cache } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';
import * as CacheManager from 'cache-manager';
import * as RedisStore from 'cache-manager-redis-store';

//import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConfigService } from '../../redis-options.constants';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache ,
   // private readonly configService: RedisConfigService,
    //private readonly configService: ConfigService, // Inject ConfigService here
   // private readonly redisConfigService: RedisConfigService,
   // private readonly configService: ConfigService,

     ) {}

  async get<T>(key: string): Promise<T | null> {
    return this.cacheManager.get<T>(key);
  }

  async set<T>(
    key: string,
    value: T
  ): Promise<void> {
    // The @CacheTTL decorator controls the TTL for Redis
    await this.cacheManager.set(key, value);
  }
}
