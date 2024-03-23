import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuery } from 'src/dto';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/types';
import { PaginatedResult } from 'src/types/pagination.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: User): Promise<User> {
    const user = new UserEntity(data);
    return await this.userRepository.save(this.userRepository.create(user));
  }

  async findMany(query: UserQuery): Promise<PaginatedResult<User>> {
    const {
      order = 'desc',
      orderBy = 'createdAt',
      page = 1,
      limit = 10,
    } = query;
    const where: FindOptionsWhere<UserEntity> = {};
    if (query?.keyword) {
      where.name = Like(`%${query.keyword}%`);
    }

    const total = await this.userRepository.count({ where });
    const result = await this.userRepository.find({
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

  async findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return await this.userRepository.findOne({
      where: fields as FindOptionsWhere<UserEntity>,
    });
  }

  async save(data: User): Promise<User> {
    const user = new UserEntity(data);
    return await this.userRepository.save(user);
  }

  async delete(id: User['id']): Promise<void> {
    await this.userRepository.delete(id);
  }
}
