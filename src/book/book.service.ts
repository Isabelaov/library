import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto, GetBooksQueryDto } from './dto';
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

  async findAll(query: GetBooksQueryDto) {
    const result = await this.findByFilters(query);

    if (!result) return 'Books not found';

    return result;
  }

  async findOne(id: string) {
    const result = await this.bookRepository.findOneBy({ id });

    return result ? result : 'Book not found';
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: string) {
    return `This action removes a #${id} book`;
  }

  private async findByIds(ids: string[], repository: Repository<any>) {
    return await repository.find({
      where: { id: In(ids) },
    });
  }

  private async findByFilters(query: GetBooksQueryDto) {
    const { date, author, genre } = query;

    let queryBuilder = this.bookRepository.createQueryBuilder('book');

    if (date) {
      queryBuilder = queryBuilder.where('book.publicationDate = :date', {
        date,
      });

      if (author) {
        queryBuilder = queryBuilder
          .innerJoin('book.authors', 'author')
          .andWhere('author.id = :author', { author });
      }

      if (genre) {
        queryBuilder = queryBuilder
          .innerJoin('book.genres', 'genre')
          .andWhere('genre.id = : genre', { genre });
      }
    }

    return await queryBuilder.getMany();
  }
}
