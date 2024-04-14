import express, { NextFunction, Response,  Request } from 'express';
import cors from 'cors';
import { ZodError } from 'zod';
import { env } from './env';


const app = express();

app.use(cors());

app.use(express.json());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
      return response.status(400).send({message: 'Validateion error', issues: error.format()});
    }

    if(env.NODE_ENV !== 'production') {
      console.error(error);
    } else {
      // #TODO: aplicar tratamento de erro para produção
    }


    return response.status(500).send({message: 'Internal server error.'});
  }
)

export { app }