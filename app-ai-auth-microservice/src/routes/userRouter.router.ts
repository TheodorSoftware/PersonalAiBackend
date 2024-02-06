import express ,{ Router } from 'express';
import UserController from '../controller/userController.controller';
import loginMiddleware from '../middleware/login.middleware';

const userController: UserController = new UserController();
const userRouter: Router = express.Router();

// LOGIN FLOW
userRouter.use('/login',loginMiddleware);
userRouter.post('/login', userController.login);
userRouter.post('/login/forgotPassword', userController.forgotPassword);

// REGISTER FLOW
userRouter.post('/register',userController.register);

export default userRouter;