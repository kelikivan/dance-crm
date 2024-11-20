import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async signIn(
        phone: string,
        password: string,
      ): Promise<{ access_token: string }> {
        
        const user = await this.usersService.getUserByPhone(phone);

        if (user){

          const match = await bcrypt.compare(password, user.password);

          if (match) {

            const payload = { sub: user.id, username: user.name };
            return {
              access_token: await this.jwtService.signAsync(payload),
            };
          }
        }

        throw new UnauthorizedException();
      }
}