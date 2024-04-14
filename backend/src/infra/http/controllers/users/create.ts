import { NextFunction, Request, Response } from "express";
import { makeCreateUserUseCase } from "../../../../domain/users/factories/make-create-user-use-case";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../../domain/users/errors/user-already-exists-error";

export async function create(request: Request, response: Response, next: NextFunction){
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const { name, email, password } = createBodySchema.parse(request.body);

  try {
    const createUserUseCase = makeCreateUserUseCase();
    
    await createUserUseCase.execute({
      name, email, password
    })
  } catch (err){
    if(err instanceof UserAlreadyExistsError){
      return response.status(409).json({message: err.message});
    }

    next(err);
  }

  return response.status(201).json();
}