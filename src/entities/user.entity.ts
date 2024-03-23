import { Exclude } from 'class-transformer';
import { User } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: String, nullable: true })
  name: string | null;

  @Column({ type: String, nullable: true })
  username: string | null;

  @Column({ type: String, nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string | null;

  @Column({ type: String, nullable: true })
  role: string | null;

  @Column({ type: Number, nullable: true })
  point: number | null;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(user: User = undefined) {
    super();

    if (!user) return;

    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.point = user.point;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  public extract(): User {
    return {
      id: this.id,
      name: this.name,
      password: this.password,
      point: this.point,
      role: this.role,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
