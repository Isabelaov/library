import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';

import { Author } from 'src/author/entities/author.entity';
import { Collection } from 'src/collection/entities/collection.entity';

@Entity('publishing-houses')
export class PublishingHouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '200' })
  name: string;

  @ManyToMany(() => Author, (author) => author.publishingHouses, {
    eager: true,
  })
  @JoinTable({ name: 'houses_authors' })
  authors: Author[];

  @OneToMany(() => Collection, (collection) => collection.publishingHouse)
  collections: Collection[];

  @BeforeInsert()
  @BeforeUpdate()
  standardizeName() {
    this.name = this.name.trim().toLocaleUpperCase();
  }
}
