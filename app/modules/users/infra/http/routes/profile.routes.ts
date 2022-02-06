import { Router } from 'express';

import userAuthenticated from '../middlewares/userAuthenticated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileController = new ProfileController();

const profileRouter = Router();

profileRouter.use(userAuthenticated);
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;