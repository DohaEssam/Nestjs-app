import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/user-create.dto';
import { updateUserDto } from './dto/user-update.dto';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('user')
export class UserController {
      // can write route here inside method

      //this method is used for dependecy injection 
      // and be used instead of the below way for creating new obj from service .
   // constructor(private UserService:UserService){ }


    constructor(private userService: UserService) {}

// using @CacheKey @CacheTTL to speed up returning response data 

  @Get('/list_users')
  @CacheKey('custom_key') // Controlling the key
  @CacheTTL(20) // Controling the duration
  getUsers() {
    //return { data: 'get user' };

    return this.userService.get();
}

  @Post('/create_user')
  //save(@Req() req: Request) {
  save(@Body() CreateUserDto: createUserDto) {
   // return req.body;
   return this.userService.create(CreateUserDto);
}

  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
   // return userId;
   return this.userService.getUser(userId);
}

@Patch('/:userId')
update(
  @Body() UpdateUserDto: updateUserDto,
  @Param() param:{userId: number}
) {
  return this.userService.update(UpdateUserDto, param);
}


}
