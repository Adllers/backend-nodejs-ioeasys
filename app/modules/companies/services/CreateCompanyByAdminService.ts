
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Errors from '@shared/errors/Errors';
import Company from '../infra/typeorm/entities/Company';


interface IRequest {
    name: string;
    email: string;
    user_id: string;
}

@injectable()
class CreateCompanyService {

    constructor(

        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

    ) {};

    public async execute({name, email, user_id}: IRequest): Promise<Company | undefined> {
        
        //Verificando repo de Usuários
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
           throw new Errors('User not found'); 
        }

        if(!user.is_admin) {
            throw new Errors('Only admin users can register companies');
        }

        if(user.company_id) {
            throw new Errors('This user already has a company');
        }

        //Verificando repo de Empresas
        const checkIfExistsCompany = await this.companiesRepository.findByEmail(email);

        if (checkIfExistsCompany) {
            throw new Errors('This company already exists');
        }

        const company = await this.companiesRepository.create({
            name,
            email,
        });

        if (company) {
            user.company_id = company.id;
            await this.usersRepository.save(user);
        }

        return company; 
    };
}

export default CreateCompanyService;