import { Response, Request } from 'express';
import { container } from 'tsyringe';


import CreateCompanyByAdminService from '@modules/companies/services/CreateCompanyByAdminService';


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
}