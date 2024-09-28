import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    const { name } = createGenreDto;

    await this.checkName(name);

    const genre = this.genreRepository.create({ name });

    return await this.genreRepository.save(genre);
  }

  async checkName(name: string) {
    const nameExists = await this.genreRepository.findOneBy({ name });

    if (nameExists) throw new BadRequestException('Name already exists');
  }
}
