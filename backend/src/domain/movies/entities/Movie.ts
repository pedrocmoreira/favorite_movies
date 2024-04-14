import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { randomUUID as uuid} from 'node:crypto';


@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    titulo?: string;

    @Column()
    diretor?: string;

    @Column()
    sinopse?: string;

    @Column()
    duracao?: number;

    @Column()
    ano_de_lancamento?: number;

    @Column()
    imagem?: string;

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
