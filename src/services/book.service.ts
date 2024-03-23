import { HttpException, Injectable } from '@nestjs/common';
import { BookRepository } from 'src/repositories';
import { Book } from 'src/types';
import { PaginatedResult } from 'src/types';
import { BookDTO, BookQuery } from 'src/dto';
import { FileService } from './file.service';
import { TagService } from './tag.service';
import { FindOptionsWhere } from 'typeorm';
import { BookEntity } from 'src/entities';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly fileService: FileService,
    private readonly tagService: TagService,
  ) {}

  async findOne(id: Book['id']): Promise<Book> {
    const book = await this.bookRepository.findOne({ id });
    if (!book) {
      throw new HttpException({ message: 'Book not found' }, 400);
    }

    return await this.bookRepository.findOne({ id });
  }

  async findMany(query: BookQuery): Promise<PaginatedResult<Book>> {
    return await this.bookRepository.findMany(query);
  }

  async findAll(fields: FindOptionsWhere<BookEntity>): Promise<Book[]> {
    return await this.bookRepository.findAll(fields);
  }

  async create(data: BookDTO): Promise<Book> {
    const book = new Book();
    book.title = data.title;
    book.content = data.content;
    book.author = data.author;
    book.price = data.price;

    book.thumbnail = await this.fileService.findOne(data.thumbnail);
    book.tags = (await this.tagService.findMany({ limit: 0 })).result;

    return this.bookRepository.create(book);
  }

  async update(id: Book['id'], data: BookDTO): Promise<Book> {
    const book = await this.findOne(id);

    book.title = data.title;
    book.content = data.content;
    book.author = data.author;
    book.price = data.price;

    book.thumbnail = await this.fileService.findOne(data.thumbnail);
    book.tags = (await this.tagService.findMany({ limit: -1 })).result;

    return await this.bookRepository.save(book);
  }

  async delete(id: Book['id']): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.delete(book.id);
  }
}
