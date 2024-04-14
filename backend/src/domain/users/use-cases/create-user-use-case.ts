import { User } from "../entities/User";
import { CreateUserDTO, InterfaceUsersRepository } from "../repositories/interface-users-repository";

interface CreateUserUseCaseRequest {
  name: string,
  email: string,
  password: string,
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: InterfaceUsersRepository
  ){}

  async execute({ name, email, password }: CreateUserDTO): Promise<CreateUserUseCaseResponse>{
    const user = await this.usersRepository.create({name, email, password});


    return {
      user
    }
  }
}