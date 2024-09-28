import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Author } from 'src/author/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { title, authors, publicationDate, genres } = createBookDto;

    const findAuthors = await this.findByIds(authors, this.authorRepository);

    if (!findAuthors) throw new NotFoundException('Authors provided not found');

    const findGenres = await this.findByIds(genres, this.genreRepository);

    if (!findGenres) throw new NotFoundException('Genres provided not found');

    const book = this.bookRepository.create({
      title,
      publicationDate,
      authors: findAuthors,
      genres: findGenres,
    });

    return await this.bookRepository.save(book);
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  private async findByIds(ids: string[], repository: Repository<any>) {
    return await repository.find({
      where: { id: In(ids) },
    });
  }
}
