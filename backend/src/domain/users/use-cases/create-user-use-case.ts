import { hash } from 'bcryptjs';

import { AppError } from "../../../infra/errors";
import { User } from "../entities/User";
import { CreateUserDTO, InterfaceUsersRepository } from "../repositories/interface-users-repository";

interface CreateUserUseCaseRequest {
  name: string,
  email: string,
  password: string,
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: InterfaceUsersRepository
  ){}

  async execute({ name, email, password }: CreateUserDTO): Promise<User>{
    const userExists = await  this.usersRepository.findByEmail(email);

    if(userExists){
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(password, 10);
    
    const user = await this.usersRepository.create({name, email, password: hashedPassword});

    return user
  }
}