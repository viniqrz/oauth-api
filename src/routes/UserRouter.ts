import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { prisma } from '../database';

const router = Router();

const service = new UserService(prisma);
const controller = new UserController(service);

router.post('/signin/google', controller.signInWithGoogle);

export { router as userRouter };
