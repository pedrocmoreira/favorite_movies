import express, { NextFunction, Response,  Request } from 'express';
import {errors} from 'celebrate';
import 'express-async-error';
import cors from 'cors';

import { routes } from './http/routes';
import { AppError } from './errors';
import { error } from 'console';


const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({message: 'Internal server error.'});
  }
)

export { app }