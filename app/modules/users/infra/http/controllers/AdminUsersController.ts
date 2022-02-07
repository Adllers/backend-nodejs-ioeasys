import { Response, Request } from 'express';
import { container } from 'tsyringe';


import CreateAdminUserService from '@modules/users/services/CreateAdminUserService';
import { classToClass } from 'class-transformer';


// index, show, create, update, delete
export default class AdminUsersController {

    public async create(request: Request, response: Response): Promise<Response> {
        
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateAdminUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        // ajustar isso depois, deve-se se retornar uma resposta sem parâmetros de segurança
        if (user) {
            user.is_admin = false;
            user.password = '';    
        }

        return response.json(classToClass(user));
    
    }
}