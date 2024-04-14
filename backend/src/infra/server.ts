import 'reflect-metadata';

import { env } from './env';
import { app } from './app';


app.listen(env.PORT, () => {
  console.log(`Server started on port ${env.PORT} 🚀`);
});