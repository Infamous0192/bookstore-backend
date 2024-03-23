import { File } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity extends BaseEntity implements File {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: String, nullable: true })
  filename: string | null;

  @Column({ type: String, nullable: true })
  originalname: string;

  @Column({ type: String, nullable: true })
  extension: string;

  @Column({ type: Number, nullable: true })
  size: number;

  @Column({ type: String, nullable: true })
  path: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(file: File = undefined) {
    super();

    if (!file) return;

    this.id = file.id;
    this.extension = file.extension;
    this.filename = file.filename;
    this.originalname = file.originalname;
    this.path = file.path;
    this.size = file.size;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt;
  }

  public extract(): File {
    return {
      id: this.id,
      filename: this.filename,
      extension: this.extension,
      originalname: this.originalname,
      path: this.path,
      size: this.size,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
