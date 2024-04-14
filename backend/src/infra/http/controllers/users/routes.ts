import { Router } from "express";

import { create } from "./create";

const usersRouter = Router();

usersRouter.post('/create', (request, response, next) => {
  return create(request, response, next);
});

export { usersRouter }