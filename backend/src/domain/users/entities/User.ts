import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { randomUUID as uuid} from 'node:crypto';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    name?: string;

    @Column({ unique: true })
    email?: string;

    @Column()
    password?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    constructor(){
      if(!this.id) {
        this.id = uuid()
      }
    }
}
