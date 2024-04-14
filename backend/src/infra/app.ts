import express, { NextFunction, Response,  Request } from 'express';
import {json} from 'body-parser';
import { ZodError } from 'zod';
import cors from 'cors';

import { env } from './env';
import { routes } from './http/routes';


const app = express();

app.use(cors());

app.use(json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
      return response.status(400).json({message: 'Validation error', issues: error.format()});
    }

    if(env.NODE_ENV !== 'production') {
      console.error(error);
    } else {
      // #TODO: aplicar tratamento de erro para produção
    }

    return response.status(500).json({message: 'Internal server error.'});
  }
)

export { app }