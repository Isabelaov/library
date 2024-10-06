import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { Collection } from './entities/collection.entity';
import { PublishingHouse } from 'src/publishing-house/entities/publishing-house.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, PublishingHouse, Book])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
