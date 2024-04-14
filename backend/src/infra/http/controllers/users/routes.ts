import { Router } from "express";

import { create } from "./create";
import { Joi, Segments, celebrate } from "celebrate";

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

export { usersRouter }