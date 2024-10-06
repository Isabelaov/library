import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Author } from 'src/author/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Collection } from 'src/collection/entities/collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Genre, Collection])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
