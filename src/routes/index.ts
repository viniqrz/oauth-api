import { Express } from 'express';

import { userRouter } from './UserRouter';

export function createRoutes(app: Express) {
  app.use('/user', userRouter);
}
