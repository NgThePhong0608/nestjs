import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      const isPasswordValid = this.userService.checkUserPassword(
        pass,
        user.password,
      );
      if (isPasswordValid) {
        return user;
      }
    }
    return null;
  }
}
