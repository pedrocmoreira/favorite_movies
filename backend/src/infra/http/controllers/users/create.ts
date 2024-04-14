import { NextFunction, Request, Response } from "express";

import { makeCreateUserUseCase } from "../../../../domain/users/factories/make-create-user-use-case";
import { UserAlreadyExistsError } from "../../../../domain/users/errors/user-already-exists-error";
import { AppError } from "../../../errors";

export async function create(request: Request, response: Response, next: NextFunction){
  const { name, email, password } = request.body;

  try {
    const createUserUseCase = makeCreateUserUseCase();
    
    await createUserUseCase.execute({
      name, email, password
    })
  } catch (error){
    throw new AppError('teste', 400)
  }

  return response.status(201).json();
}