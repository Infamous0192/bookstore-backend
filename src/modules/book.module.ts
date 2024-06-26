import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity, UserEntity } from 'src/entities';
import { BookService } from 'src/services';
import { BookController } from 'src/controllers';
import { BookRepository } from 'src/repositories';
import { FileModule } from './file.module';
import { TagModule } from './tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    FileModule,
    TagModule,
  ],
  controllers: [BookController],
  providers: [BookRepository, BookService],
  exports: [BookService],
})
export class BookModule {}
