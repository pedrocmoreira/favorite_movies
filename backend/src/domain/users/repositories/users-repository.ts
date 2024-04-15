import { Repository } from "typeorm";

import { CreateUserDTO, InterfaceUsersRepository } from "./interface-users-repository";

import { User } from "../entities/User";
import { AppDataSource } from "../../../infra/database";

export class UsersRepository implements InterfaceUsersRepository {
  private repository: Repository<User>;

  constructor(){
    this.repository = AppDataSource.getRepository(User);
  }
  

  async create({email, name, password}:CreateUserDTO): Promise<User>{
    const user = await this.repository.create({
      name, email, password
    });

    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({email});
  }
}