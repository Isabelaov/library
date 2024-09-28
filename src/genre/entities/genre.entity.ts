import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from 'src/book/entities/book.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '100' })
  name: string;

  @ManyToMany(() => Book, (book) => book.genres)
  books?: Book[];

  @BeforeInsert()
  trimName() {
    this.name = this.name.trim().toLocaleLowerCase();
  }
}
