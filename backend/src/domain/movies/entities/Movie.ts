import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { randomUUID as uuid} from 'node:crypto';

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar')
    title?: string;

    @Column('text')
    overview?: string;

    @Column('int')
    release_date?: number;

    @Column('varchar')
    poster_path?: string;

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
