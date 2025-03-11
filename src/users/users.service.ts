import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
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
    const currentDate = new Date();
    const userData = {
      ...createUserDto,
      password: this.hashPassword(createUserDto.password),
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    const user = new this.UserModel(userData);
    return user.save();
  }

  async findAll(keyword?: string): Promise<User[]> {
    let query = this.UserModel.find();

    if (keyword) {
      query = query.find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { email: { $regex: keyword, $options: 'i' } },
        ],
      });
    }
    query = query.sort({ createdAt: -1 });
    return query.exec();
  }

  async findOne(id: string) {
    // return this.UserModel.findById(id).select('-__v -password');
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { statusCode: 400, message: 'Invalid user ID' };
    }
    return this.UserModel.findOne({ _id: id }).select('-__v -password');
  }

  async update(updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);

    return await this.UserModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { statusCode: 400, message: 'Invalid user ID' };
    }
    return await this.UserModel.deleteOne({ _id: id });
  }
}
