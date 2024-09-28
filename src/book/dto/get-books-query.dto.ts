import { IsOptional, IsString, IsUUID, Matches } from 'class-validator';

export class GetBooksQueryDto {
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsString()
  date?: string;

  @IsOptional()
  @IsUUID()
  author?: string;

  @IsOptional()
  @IsUUID()
  genre?: string;
}
