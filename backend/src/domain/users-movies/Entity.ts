import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/entities/User';
import { Movie } from '../movies/entities/Movie';


@Entity('users_movies')
export class UserMovie {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    usuario?: User;

    @ManyToOne(() => Movie, movie => movie.id, { onDelete: 'CASCADE' })
    filme?: Movie;

    @Column()
    marked_as?: string;
}