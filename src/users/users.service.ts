import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = ['John', 'Jane', 'Jim', 'Jill'];

  getUsers(): string[] {
    return this.users;
  }
}
