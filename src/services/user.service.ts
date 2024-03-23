import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories';
import { Book, User } from 'src/types';
import { PaginatedResult } from 'src/types';
import { UserDTO, UserQuery } from 'src/dto';
import bcrypt from 'bcrypt';
import { EntityCondition } from 'src/utils/types';
import { BookService } from './book.service';
import { In } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bookService: BookService,
  ) {}

  async findOne(fields: EntityCondition<User>): Promise<User> {
    const user = await this.userRepository.findOne(fields);
    if (!user) {
      throw new HttpException({ message: 'User not found' }, 400);
    }

    return user;
  }

  async findMany(query: UserQuery): Promise<PaginatedResult<User>> {
    return await this.userRepository.findMany(query);
  }

  async create(data: UserDTO): Promise<User> {
    if (
      (await this.userRepository.findOne({ username: data.username })) != null
    ) {
      throw new HttpException({ message: 'User already exist' }, 400);
    }

    const user = new User();
    user.name = data.name;
    user.point = data.point;
    user.role = data.role;
    user.username = data.username;
    user.books = [];

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(data.password, salt);

    return this.userRepository.create(user);
  }

  async update(id: User['id'], data: UserDTO): Promise<User> {
    const user = await this.findOne({ id });

    user.name = data.name;
    user.username = data.username;
    user.point = data.point;
    user.role = data.role;
    user.password = data.password;

    return await this.userRepository.save(user);
  }

  async getBook(id: User['id']): Promise<Book[]> {
    const user = await this.findOne({ id });

    return user.books;
  }

  async addBook(id: User['id'], bookId: Book['id']): Promise<User> {
    const user = await this.findOne({ id });
    const book = await this.bookService.findOne(bookId);
    const bookIds = [...new Set([...user.books.map(({ id }) => id), book.id])];
    if (user.books.length == bookIds.length) {
      throw new HttpException({ message: `You already have this book` }, 400);
    }

    if (book.price > user.point) {
      throw new HttpException({ message: `You don't have enough point` }, 400);
    }

    user.point -= book.price;
    user.books = await this.bookService.findAll({ id: In(bookIds) });

    return await this.userRepository.save(user);
  }

  async removeBook(id: User['id'], bookId: Book['id']): Promise<User> {
    const user = await this.findOne({ id });
    const book = await this.bookService.findOne(bookId);

    const bookIds = user.books.map(({ id }) => id).filter((v) => v !== book.id);
    if (user.books.length == bookIds.length) {
      throw new HttpException({ message: `You don't have this book` }, 400);
    }

    user.point += book.price;
    user.books = await this.bookService.findAll({ id: In(bookIds) });

    return await this.userRepository.save(user);
  }

  async delete(id: User['id']): Promise<void> {
    const user = await this.findOne({ id });
    await this.userRepository.delete(user.id);
  }
}
