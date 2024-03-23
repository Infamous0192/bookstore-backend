import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileQuery } from 'src/dto';
import { FileEntity } from 'src/entities/file.entity';
import { File } from 'src/types';
import { PaginatedResult } from 'src/types/pagination.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async create(data: File): Promise<File> {
    const file = new FileEntity(data);
    return await this.fileRepository.save(this.fileRepository.create(file));
  }

  async findMany(query: FileQuery): Promise<PaginatedResult<File>> {
    const {
      order = 'desc',
      orderBy = 'createdAt',
      page = 1,
      limit = 10,
    } = query;
    const where: FindOptionsWhere<FileEntity> = {};
    if (query?.keyword) {
      where.filename = Like(`%${query.keyword}%`);
    }

    const total = await this.fileRepository.count({ where });
    const result = await this.fileRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where,
      order: {
        [orderBy]: order,
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

  async findOne(fields: EntityCondition<File>): Promise<NullableType<File>> {
    return await this.fileRepository.findOne({
      where: fields as FindOptionsWhere<FileEntity>,
    });
  }

  async save(data: File): Promise<File> {
    const file = new FileEntity(data);
    return await this.fileRepository.save(file);
  }

  async delete(id: File['id']): Promise<void> {
    await this.fileRepository.delete(id);
  }
}
