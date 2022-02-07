import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';


// index, show, create, update, delete
export default class UsersController {

    public async create(request: Request, response: Response): Promise<Response> {
        
        const user_id = request.user.id;

        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
            user_id,
        });
        
        if (user) {
            user.password = '';    
        }

        return response.json(classToClass(user));
    
    }
}