import { Router } from 'express';

import CompaniesController from '../controllers/CompaniesController';
import adminUserAuthenticated from '../middlewares/adminUserAuthenticated';

const companiesController = new CompaniesController();

const companiesRouter = Router();

//Uso de autenticação 
companiesRouter.use(adminUserAuthenticated);
//create user
companiesRouter.post('/', companiesController.create);

export default companiesRouter;