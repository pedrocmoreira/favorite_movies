import { UsersRepository } from "../repositories/users-repository";
import { CreateLoginUser } from "../use-cases/create-login-user-use-case";

export function makeCreateLoginUserUseCase(){
  const usersRepository = new UsersRepository();
  const useCase = new CreateLoginUser(usersRepository);


  return useCase;
}