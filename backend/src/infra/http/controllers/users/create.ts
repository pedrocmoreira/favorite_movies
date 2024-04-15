import { NextFunction, Request, Response } from "express";

import { makeCreateUserUseCase } from "../../../../domain/users/factories/make-create-user-use-case";

export async function create(request: Request, response: Response, next: NextFunction){
  const { name, email, password } = request.body;

    const createUserUseCase = makeCreateUserUseCase();
    
    const user = await createUserUseCase.execute({
      name, email, password
    })
  
  return response.status(201).json(user);
}