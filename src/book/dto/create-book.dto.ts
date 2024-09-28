import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  authors: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  publicationDate: Date;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  genres: string[];
}
