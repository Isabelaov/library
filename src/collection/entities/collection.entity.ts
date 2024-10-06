import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from 'src/book/entities/book.entity';
import { PublishingHouse } from 'src/publishing-house/entities/publishing-house.entity';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '200' })
  name: string;

  @ManyToOne(() => Book, (book) => book.collections)
  books: Book[];

  @ManyToMany(() => PublishingHouse, (house) => house.collections)
  publishingHouse: PublishingHouse;

  @BeforeInsert()
  @BeforeUpdate()
  formatName() {
    this.name = this.name.trim().toLocaleLowerCase();
  }
}
