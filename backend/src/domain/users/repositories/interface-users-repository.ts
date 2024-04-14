import { User } from "../entities/User";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
}

export interface InterfaceUsersRepository {
  create({name, email, password}: CreateUserDTO): Promise<User>;
}