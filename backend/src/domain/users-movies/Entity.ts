import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/entities/User';
import { Movie } from '../movies/entities/Movie';

@Entity('users_movies')
export class UserMovie {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    id_user?: User;

    @ManyToOne(() => Movie, movie => movie.id, { onDelete: 'CASCADE' })
    id_movie?: Movie;

    @Column('varchar')
    marked_as?: string;
}
