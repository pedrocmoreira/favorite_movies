import { PrismaUsersRepository } from "../repositories/prisma-users-repository"
import { RegisterUseCase } from "../use-cases/register-user-use-case"


export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
