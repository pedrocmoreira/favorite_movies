
export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
}

export interface InterfaceUsersRepository {
  create: CreateUserDTO
}