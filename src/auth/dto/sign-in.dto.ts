import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'hello.world@uwu.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password!123' })
  @IsString()
  password: string;
}
