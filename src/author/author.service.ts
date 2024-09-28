import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
@Injectable()
export class AuthorService {
  create(createAuthorDto: CreateAuthorDto) {
    console.log(createAuthorDto);

    return 'This action adds a new author';
  }
}
