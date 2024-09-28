import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from 'src/book/entities/book.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '100' })
  name: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books?: Book[];

  @BeforeInsert()
  trimName() {
    this.name = this.name.trim().toLocaleLowerCase();
  }
}
