import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookQuery } from 'src/dto';
import { UserEntity } from 'src/entities';
import { BookEntity } from 'src/entities/book.entity';
import { Book } from 'src/types';
import { PaginatedResult } from 'src/types/pagination.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: Book): Promise<Book> {
    const book = new BookEntity(data);
    return await this.bookRepository.save(this.bookRepository.create(book));
  }

  async findAll(fields: FindOptionsWhere<BookEntity>) {
    return await this.bookRepository.find({
      where: fields as FindOptionsWhere<BookEntity>,
    });
  }

  async findMany(query: BookQuery): Promise<PaginatedResult<Book>> {
    const {
      order = 'desc',
      orderBy = 'createdAt',
      page = 1,
      limit = 10,
    } = query;
    const where: FindOptionsWhere<BookEntity> = {};
    if (query?.keyword) {
      where.title = Like(`%${query.keyword}%`);
    }

    if (query?.tags) {
      where.tags = {
        id: In(query.tags),
      };
    }

    if (query.user) {
      // Assuming you have a many-to-many relationship defined between User and Book entities
      const user = await this.userRepository.findOne({
        where: { id: Number(query.user) },
        relations: { books: true },
      });

      if (user) {
        const bookIds = user.books.map((book) => book.id);
        where.id = In(bookIds);
      }
    }

    const total = await this.bookRepository.count({ where });
    const result = await this.bookRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where,
      order: {
        [orderBy]: order,
      },
      relations: {
        thumbnail: true,
        tags: true,
      },
    });

    return {
      metadata: {
        page,
        limit,
        total,
        count: result.length,
        hasPrev: page > 1,
        hasNext: result.length > 0 && page < Math.ceil(total / limit),
      },
      result,
    };
  }

  async findOne(fields: EntityCondition<Book>): Promise<NullableType<Book>> {
    return await this.bookRepository.findOne({
      where: fields as FindOptionsWhere<BookEntity>,
      relations: {
        thumbnail: true,
        tags: true,
      },
    });
  }

  async save(data: Book): Promise<Book> {
    const book = new BookEntity(data);
    return await this.bookRepository.save(book);
  }

  async delete(id: Book['id']): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
