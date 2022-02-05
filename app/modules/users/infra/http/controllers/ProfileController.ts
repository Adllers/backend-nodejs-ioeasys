import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';

// index, show, create, update, delete
export default class ProfileController {

    public async show(request: Request, response: Response): Promise<Response> {
        
        const user_id = request.user.id
        
        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({ user_id });

        user.password = '';

        return response.json(user);

    }

}