import { Book, File, Tag } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { FileEntity } from './file.entity';
import { TagEntity } from './tag.entity';

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity implements Book {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: String, nullable: true })
  title: string | null;

  @Column({ type: String, nullable: true })
  content: string | null;

  @Column({ type: String, nullable: true })
  author: string;

  @Column({ type: Number, nullable: true })
  price: number;

  @ManyToMany(() => TagEntity)
  @JoinTable({ name: 'book_tags' })
  tags: Tag[];

  @ManyToOne(() => FileEntity)
  @JoinColumn({ name: 'thumbnailId' })
  thumbnail: File;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(book: Book = undefined) {
    super();

    if (!book) return;

    this.id = book.id;
    this.title = book.title;
    this.content = book.content;
    this.author = book.author;
    this.price = book.price;
    this.tags = book.tags;
    this.thumbnail = book.thumbnail;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;
  }

  public extract(): Book {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      content: this.content,
      price: this.price,
      tags: this.tags,
      thumbnail: this.thumbnail,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
