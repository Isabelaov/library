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

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '200' })
  title: string;

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

  @BeforeInsert()
  @BeforeUpdate()
  trimName() {
    this.title = this.title.trim().toLocaleLowerCase();
  }
}
