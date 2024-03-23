import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities';
import { FileService } from 'src/services';
import { FileController } from 'src/controllers';
import { FileRepository } from 'src/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FileController],
  providers: [FileRepository, FileService],
  exports: [FileService],
})
export class FileModule {}
