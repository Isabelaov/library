import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublishingHouseController } from './publishing-house.controller';
import { PublishingHouseService } from './publishing-house.service';
import { PublishingHouse } from './entities/publishing-house.entity';
import { Author } from 'src/author/entities/author.entity';
import { Book } from 'src/book/entities/book.entity';
import { Collection } from 'src/collection/entities/collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublishingHouse, Collection, Author, Book]),
  ],
  controllers: [PublishingHouseController],
  providers: [PublishingHouseService],
})
export class PublishingHouseModule {}
