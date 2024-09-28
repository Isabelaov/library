import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ description: 'Name of the genre' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim().toLocaleLowerCase())
  name: string;
}
