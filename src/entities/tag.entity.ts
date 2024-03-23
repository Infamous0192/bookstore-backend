import { Tag } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'tags' })
export class TagEntity extends BaseEntity implements Tag {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: String, nullable: true })
  name: string | null;

  @Column({ type: String, nullable: true })
  description?: string | null;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(tag: Tag = undefined) {
    super();

    if (!tag) return;

    this.id = tag.id;
    this.name = tag.name;
    this.description = tag.description;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;
  }

  public extract(): Tag {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
