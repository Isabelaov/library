import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '200' })
  name: string;

  @Column({ type: 'varchar', length: '200' })
  email: string;

  @Column({ type: 'varchar', length: '200', select: false })
  password: string;

  @Column({ type: 'varchar', length: '200', nullable: true })
  address: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  format() {
    this.name = this.name.trim().toLocaleUpperCase();
    this.email = this.email.trim();
  }
}
