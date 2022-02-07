import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import Errors from '@shared/errors/Errors';


interface IRequest {
    user_id: string;
}

@injectable()
class GetUsersFromCompany {

    constructor(

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

    ) {};

    public async execute({ user_id }: IRequest): Promise<User[]> {
         
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new Errors("User does not exist");
        }

        if (!user.is_admin || !user.company_id) {
            throw new Errors("User whithout permission");
        } 

        const users = await this.usersRepository.findUsersByCompanyId(user.company_id);

        return users;
    };

}

export default GetUsersFromCompany;