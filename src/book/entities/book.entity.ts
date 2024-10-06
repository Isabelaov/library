import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from 'src/author/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Collection } from 'src/collection/entities/collection.entity';
import { BookFormat } from '../enums/book-format.enum';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '200' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'varchar', length: '200' })
  cover: string;

  @Column({ type: 'enum', enum: BookFormat })
  type: BookFormat;

  @Column({ type: 'date', name: 'publication_date' })
  publicationDate: Date;

  @ManyToMany(() => Author, (author) => author.books, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'books_authors' })
  authors: Author[];

  @ManyToMany(() => Genre, (genre) => genre.books, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'books_genres' })
  genres: Genre[];

  @ManyToMany(() => Collection, (collection) => collection.books)
  @JoinTable({ name: 'books_collections' })
  collections: Collection[];

  @BeforeInsert()
  @BeforeUpdate()
  formatName() {
    this.title = this.title.trim().toLocaleUpperCase();
  }
}
