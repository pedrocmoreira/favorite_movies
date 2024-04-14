import 'reflect-metadata';

import { env } from './env';
import { app } from './app';
import { AppDataSource } from './database';

AppDataSource.initialize().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT} 🚀`);
  });
});