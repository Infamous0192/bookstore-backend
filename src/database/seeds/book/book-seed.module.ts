import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookSeedService } from './book-seed.service';
import { BookEntity, FileEntity, TagEntity } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    TypeOrmModule.forFeature([TagEntity]),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  providers: [BookSeedService],
  exports: [BookSeedService],
})
export class BookSeedModule {}
