import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagQuery } from 'src/dto';
import { TagEntity } from 'src/entities/tag.entity';
import { Tag } from 'src/types';
import { PaginatedResult } from 'src/types/pagination.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(data: Tag): Promise<Tag> {
    const tag = new TagEntity(data);
    return await this.tagRepository.save(this.tagRepository.create(tag));
  }

  async findMany(query: TagQuery): Promise<PaginatedResult<Tag>> {
    const {
      order = 'desc',
      orderBy = 'createdAt',
      page = 1,
      limit = 10,
    } = query;
    const where: FindOptionsWhere<TagEntity> = {};
    if (query?.keyword) {
      where.name = Like(`%${query.keyword}%`);
    }

    const total = await this.tagRepository.count({ where });
    const result = await this.tagRepository.find({
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

  async findOne(fields: EntityCondition<Tag>): Promise<NullableType<Tag>> {
    return await this.tagRepository.findOne({
      where: fields as FindOptionsWhere<TagEntity>,
    });
  }

  async save(data: Tag): Promise<Tag> {
    const tag = new TagEntity(data);
    return await this.tagRepository.save(tag);
  }

  async delete(id: Tag['id']): Promise<void> {
    await this.tagRepository.delete(id);
  }
}
