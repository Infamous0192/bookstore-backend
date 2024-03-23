import { HttpException, Injectable } from '@nestjs/common';
import { File } from 'src/types';
import { PaginatedResult } from 'src/types';
import { FileQuery } from 'src/dto';
import { FileRepository } from 'src/repositories';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async findOne(id: File['id']): Promise<File> {
    const file = await this.fileRepository.findOne({ id });
    if (!file) {
      throw new HttpException({ message: 'File not found' }, 400);
    }

    return await this.fileRepository.findOne({ id });
  }

  async findMany(query: FileQuery): Promise<PaginatedResult<File>> {
    return await this.fileRepository.findMany(query);
  }

  async upload(data: Express.Multer.File): Promise<File> {
    return this.fileRepository.create({
      extension: data.filename.split('.').at(-1),
      filename: data.filename,
      originalname: data.originalname,
      path: `uploads/${data.filename}`,
      size: data.size,
    });
  }

  async delete(id: File['id']): Promise<void> {
    const file = await this.findOne(id);
    await this.fileRepository.delete(file.id);
  }
}
