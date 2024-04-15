import { NextFunction, Request, Response } from "express";

import { makeCreateLoginUserUseCase } from "../../../../domain/users/factories/make-create-login-user-use-case";
import { AppError } from "../../../errors";

export async function login(request: Request, response: Response, next: NextFunction){
  const { email, password } = request.body;

  const createLoginUserUseCase = makeCreateLoginUserUseCase();
  
  try {
    const user = await createLoginUserUseCase.execute({
      email, password
    });

    return response.status(201).json(user);
  } catch (error: any) {
    throw new AppError('Internal server error', 500);
  }
}
