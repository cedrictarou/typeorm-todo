import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './User'

@Entity()
export class Todo extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  isDone: boolean = false;

  @ManyToOne(() => User, user => user.todos)
  user: User;
}
