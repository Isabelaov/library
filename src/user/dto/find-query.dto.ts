import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindQueryDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only letters and spaces',
  })
  @Transform(({ value }) => value.toLocaleUpperCase())
  name?: string;
}
