import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity, FileEntity, TagEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class BookSeedService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async run() {
    const thumbnail = await this.fileRepository.save(
      this.fileRepository.create({
        filename:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        extension: 'jpg',
        originalname:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        path: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        size: 500,
      }),
    );
    await this.tagRepository.insert([
      { name: 'Sci-Fi' },
      { name: 'Comedy' },
      { name: 'Action' },
      { name: 'Fantasy' },
      { name: 'Education' },
    ]);

    const tags = await this.tagRepository.find();

    for (let i = 0; i < 100; i++) {
      const title = faker.lorem.words({ min: 2, max: 6 });
      const content = faker.lorem.paragraphs(3);
      const author = faker.person.firstName();
      const price = faker.number.int({ min: 5, max: 30 });
      const createdAt = faker.date.past();
      const updatedAt = faker.date.recent();

      const book = new BookEntity();
      book.title = title;
      book.content = content;
      book.author = author;
      book.price = price;
      book.createdAt = createdAt;
      book.updatedAt = updatedAt;
      book.thumbnail = thumbnail;
      const randomTagCount = faker.number.int({
        min: 1,
        max: Math.min(5, tags.length),
      });
      const selectedTags = faker.helpers.shuffle(tags).slice(0, randomTagCount);
      book.tags = selectedTags;

      await this.bookRepository.save(this.bookRepository.create(book));
    }
  }
}
