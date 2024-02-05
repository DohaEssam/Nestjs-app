import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

// here need to call user sevices
  constructor(
    private userService: UserService,
    private jwtService :JwtService ,
    ) {}

    async validateUser(email:string , password:string){
         // check user exist logic 
         const user= await  this.userService.findUserByEmail(email);
         if (user && user.password ===password){
               return user  ;

         }
         return null;
     }

     async login(user:any){
      const payload = { sub: user.userId, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };

     }

    }

