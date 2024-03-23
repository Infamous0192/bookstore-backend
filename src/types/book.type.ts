import { File } from './file.type';
import { Tag } from './tag.type';

export interface Book {
  id: number | string;

  title: string;
  content: string;
  author: string;
  price: number;
  thumbnail: File;
  tags: Tag[];

  createdAt: Date;
  updatedAt: Date;
}
