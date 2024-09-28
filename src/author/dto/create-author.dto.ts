import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Name of the author' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
