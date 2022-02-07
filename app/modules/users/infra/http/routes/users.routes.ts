import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AdminUsersController from '../controllers/AdminUsersController';
import UsersController from '../controllers/UsersController';
import userAuthenticated from '../middlewares/userAuthenticated';

const usersController = new UsersController();
const adminUsersController = new AdminUsersController();

const usersRouter = Router();

//create common user by admin user
usersRouter.post('/', userAuthenticated , usersController.create);

//create admin user
usersRouter.post('/admin', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}), adminUsersController.create);


export default usersRouter;