import { UsersRepository } from "../repositories/users-repository";
import { CreateUserUseCase } from "../use-cases/create-user-use-case";


export function makeCreateUserUseCase(){
  const usersRepository = new UsersRepository();
  const useCase = new CreateUserUseCase(usersRepository);


  return useCase;
}