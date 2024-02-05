import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CacheService } from 'src/cache/cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisConfigService } from 'redis-options.constants';

@Module({
  controllers: [UserController],
  providers: [UserService, CacheService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User])],

})
export class UserModule {}
