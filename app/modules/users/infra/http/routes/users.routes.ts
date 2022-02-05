import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

//create user
usersRouter.post('/', usersController.create);

export default usersRouter;