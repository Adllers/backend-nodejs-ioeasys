import { Response, Request } from 'express';
import { container } from 'tsyringe';


import CreateCompanyByAdminService from '@modules/companies/services/CreateCompanyByAdminService';
import GetUsersFromCompany from '@modules/companies/services/GetUsersFromCompany';
import { classToClass } from 'class-transformer';

// index, show, create, update, delete
export default class CompaniesController {

    public async create(request: Request, response: Response): Promise<Response> {
        
        const user_id = request.user.id;

        const { name, email } = request.body;

        const createCompany = container.resolve(CreateCompanyByAdminService);

        const company = await createCompany.execute({
            name,
            email,
            user_id,
        });
        
        return response.json(company);
    
    }

    public async index(request: Request, response: Response): Promise<Response> {
       
        const user_id = request.user.id;
 
        // injetando repositorio
        const getUsers = container.resolve(GetUsersFromCompany);
 
        const users = await getUsers.execute({
            user_id, 
        });
 
        return response.json(classToClass(users));
    } 
}