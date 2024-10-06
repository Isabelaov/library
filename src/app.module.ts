import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { validationSchema } from './common/config/env.config';
import { getDbConfig } from './common/config/db.config';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { PublishingHouseModule } from './publishing-house/publishing-house.module';
import { UserModule } from './user/user.module';
import { CollectionModule } from './collection/collection.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDbConfig,
    }),
    BookModule,
    AuthorModule,
    GenreModule,
    PublishingHouseModule,
    UserModule,
    CollectionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
