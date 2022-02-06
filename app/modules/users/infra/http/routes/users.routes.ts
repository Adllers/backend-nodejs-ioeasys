import { Router } from 'express';

import AdminUsersController from '../controllers/AdminUsersController';
import UsersController from '../controllers/UsersController';
import userAuthenticated from '../middlewares/userAuthenticated';

const usersController = new UsersController();
const adminUsersController = new AdminUsersController();

const usersRouter = Router();

//create common user by admin user
usersRouter.post('/', userAuthenticated , usersController.create);

//create admin user
usersRouter.post('/admin', adminUsersController.create);


export default usersRouter;