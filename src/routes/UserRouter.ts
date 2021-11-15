import { Router } from 'express';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';

const router = Router();

const service = new UserService();
const controller = new UserController(service);

router.post('/signin/google', controller.signInWithGoogle);
router.post('/signin/fb', controller.signInWithFacebook);

export { router as userRouter };
