import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from 'src/entities';
import { TagService } from 'src/services';
import { TagController } from 'src/controllers';
import { TagRepository } from 'src/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagRepository, TagService],
  exports: [TagService],
})
export class TagModule {}
