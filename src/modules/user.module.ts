import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { UserService } from 'src/services';
import { UserController } from 'src/controllers';
import { UserRepository } from 'src/repositories';
import { BookModule } from './book.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), BookModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
