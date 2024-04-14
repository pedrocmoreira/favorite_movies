import { DataSource } from "typeorm";
import { env } from "../env";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE,

  entities: [

  ],
  migrations: [

  ]
})