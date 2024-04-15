import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { randomUUID as uuid} from 'node:crypto';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar')
    name?: string;

    @Column({ type: 'varchar', unique: true })
    email?: string;

    @Column('varchar')
    password?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    constructor(password: string){
      if(!this.id) {
        this.id = uuid()
      }
    }
}
