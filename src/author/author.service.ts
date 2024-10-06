import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';
import type { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const { name } = createAuthorDto;

    await this.checkName(name);

    const author = this.authorRepository.create({ name });
    return await this.authorRepository.save(author);
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: string) {
    return await this.authorRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateAuthorDto) {}

  async checkName(name: string) {
    const nameExists = await this.authorRepository.findOneBy({ name });

    if (nameExists) throw new BadRequestException('Name already exists');
  }
}
