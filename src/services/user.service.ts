import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories';
import { User } from 'src/types';
import { PaginatedResult } from 'src/types';
import { UserDTO, UserQuery } from 'src/dto';
import bcrypt from 'bcrypt';
import { EntityCondition } from 'src/utils/types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async delete(id: User['id']): Promise<void> {
    const user = await this.findOne({ id });
    await this.userRepository.delete(user.id);
  }
}
