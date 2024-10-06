import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from 'src/book/entities/book.entity';
import { PublishingHouse } from 'src/publishing-house/entities/publishing-house.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '100', unique: true })
  name: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books?: Book[];

  @ManyToMany(() => PublishingHouse, (house) => house.authors)
  publishingHouses: PublishingHouse[];

  @BeforeInsert()
  trimName() {
    this.name = this.name.trim().toLocaleLowerCase();
  }
}
