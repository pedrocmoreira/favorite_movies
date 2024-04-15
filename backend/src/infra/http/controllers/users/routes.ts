import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { create } from "./create";
import { login } from "./login";

const usersRouter = Router();

usersRouter.post('/create',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
(request, response, next) => {
  return create(request, response, next);
});

usersRouter.post('/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
(request, response, next) => {
  return login(request, response, next);
});

export { usersRouter }