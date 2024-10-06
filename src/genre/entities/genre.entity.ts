import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Genre, (genre) => genre.subGenres)
  genre: Genre[];

  @ManyToOne(() => Genre, (genre) => genre.subGenres, {
    nullable: true,
  })
  subGenres?: Genre[];

  @BeforeInsert()
  @BeforeUpdate()
  formatName() {
    this.name = this.name.trim().toLocaleUpperCase();
  }
}
