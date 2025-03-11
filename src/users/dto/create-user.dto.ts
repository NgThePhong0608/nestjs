import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({ message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @IsOptional()
  @IsInt({ message: 'Age must be an integer' })
  @Min(0, { message: 'Age cannot be negative' })
  age?: number;

  @IsOptional()
  @IsDateString({ message: 'createdAt must be a valid ISO 8601 date string' })
  createdAt?: Date;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'updatedAt must be a valid ISO 8601 date string' },
  )
  updatedAt?: Date;
}
