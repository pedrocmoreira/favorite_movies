import { Router } from "express";
import { usersRouter } from "../controllers/users/routes";

const routes = Router();

routes.use('/users', usersRouter);

export { routes }