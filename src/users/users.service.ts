import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = this.hashPassword(createUserDto.password);
    const user = new this.UserModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    // return this.UserModel.findOne({ _id: id });
    return this.UserModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
