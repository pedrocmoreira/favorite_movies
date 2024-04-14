import 'dotenv/config';
import { DataSource } from "typeorm";


// Entities
import { Movie } from "../../domain/movies/entities/Movie";
import { User } from "../../domain/users/entities/User";
import { UserMovie } from "../../domain/users-movies/Entity";

// Migrations
import { CreateUsersTable1713110935904 } from "./migrations/1713110935904-CreateUsersTable";
import { CreateMoviesTable1713111418175 } from "./migrations/1713111418175-CreateMoviesTable";
import { CreateUsersMoviesTable1713112098391 } from "./migrations/1713112098391-CreateUsersMoviesTable";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,

  entities: [
    Movie,
    User,
    UserMovie
  ],
  migrations: [
    CreateUsersTable1713110935904,
    CreateMoviesTable1713111418175,
    CreateUsersMoviesTable1713112098391,
  ]
});