import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

dayjs.extend(utc);

export class CreateUserDto {
  @ApiProperty({ example: 'hello world' })
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only letters and spaces',
  })
  @Transform(({ value }) => value.toLocaleUpperCase())
  name: string;

  @ApiProperty({ example: 'hello.world@uwu.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password!123' })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.*])[A-Za-z\d@$!%*?&.*]{8,}$/,
    { message: 'Password is too weak' },
  )
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
