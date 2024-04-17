import { PrismaUsersRepository } from "../repositories/prisma-users-repository"
import { AuthenticateUserUseCase } from "../use-cases/authenticate-user-use-case"


export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUserUseCase(usersRepository)

  return authenticateUseCase
}
