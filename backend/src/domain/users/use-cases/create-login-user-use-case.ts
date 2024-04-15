import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { AppError } from "../../../infra/errors";

import auth from "../../../@config/auth";

import { InterfaceUsersRepository } from "../repositories/interface-users-repository";

type CreateLoginDTO = {
  email: string;
  password: string;
};

export class CreateLoginUser {
  constructor(
    private usersRepository: InterfaceUsersRepository,
  ) { }

  async execute({ email, password }: CreateLoginDTO) {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        throw new AppError('Incorrect email/password combination', 401);
      }

      const passwordConfirmed = await compare(password, user.password!);

      if (!passwordConfirmed) {
        throw new AppError('Incorrect email/password combination', 401);
      }

      const accessToken = sign({}, auth.jwt.secret!, {
        subject: user.id,
        expiresIn: auth.jwt.expiresIn,
      });

      // const expires = new Date(Date.now() + auth.refreshToken.duration);

      return { accessToken };
    } catch (error) {
      console.error("Error occurred in CreateLoginUser.execute:", error);
      throw error; // rethrow the error to ensure it's caught by the controller
    }
  }
}
