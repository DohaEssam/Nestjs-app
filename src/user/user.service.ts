import { Inject, Injectable, Param  } from '@nestjs/common';
import { updateUserDto } from './dto/user-update.dto';
import { createUserDto } from './dto/user-create.dto';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from 'src/cache/cache.service';


@Injectable()
export class UserService {
  
    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // for caching  // to speed up response
    private readonly cacheService: CacheService, // Inject CacheService
  
   ) {}

// ---------- to get and set cached data in redis db ------------------//
// async getCachedUsers(): Promise<User[] | null> {
//      return this.cacheManager.get<User[]>('custom_key');

// }

// async setCachedUsers(users: User[]): Promise<void> {
//   // Cache the users with the specified key and TTL (time-to-live)
//   await this.cacheManager.set('custom_key', users, { ttl: 20 });
// }

//---------------------------------------------------//

  async get(): Promise<User[]> {
      const cachedUsers = await this.cacheService.get<User[]>('custom_key');

    if (cachedUsers) {
      console.log("caching user....");
      return cachedUsers;
    }
        const users = await this.userRepository.find();
        await this.cacheService.set('custom_key', users);
        return users;
    
    }
   async create(CreateUserDto: createUserDto) {
    const createdUser =  this.userRepository.save(CreateUserDto);
    // Invalidate the cache after creating a new user
  await this.cacheService.set('custom_key', []);

  return createdUser;
       // return  this.userRepository.save(CreateUserDto);
      }
  getUser(userId: number) {
       // return param;
    this.userRepository.findOne({ where: { id: userId } });
    }

  update(UpdateUserDto :updateUserDto, param: { userId: number }) {
    return { body: updateUserDto, param };
      }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }    
}
