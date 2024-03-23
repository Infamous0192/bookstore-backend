import { HttpException, Injectable } from '@nestjs/common';
import { TagRepository } from 'src/repositories';
import { Tag } from 'src/types';
import { PaginatedResult } from 'src/types';
import { TagDTO, TagQuery } from 'src/dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async findOne(id: Tag['id']): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ id });
    if (!tag) {
      throw new HttpException({ message: 'Tag not found' }, 400);
    }

    return await this.tagRepository.findOne({ id });
  }

  async findMany(query: TagQuery): Promise<PaginatedResult<Tag>> {
    return await this.tagRepository.findMany(query);
  }

  async create(data: TagDTO): Promise<Tag> {
    return this.tagRepository.create(data);
  }

  async update(id: Tag['id'], data: TagDTO): Promise<Tag> {
    const tag = await this.findOne(id);

    tag.name = data.name;
    tag.description = data.description;

    return await this.tagRepository.save(tag);
  }

  async delete(id: Tag['id']): Promise<void> {
    const tag = await this.findOne(id);
    await this.tagRepository.delete(tag.id);
  }
}
