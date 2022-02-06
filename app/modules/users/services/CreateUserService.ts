import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Errors from '@shared/errors/Errors';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
    user_id: string;
}

@injectable()
class CreateUserService {

    constructor(

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
 
    ) {};

    public async execute({ name, email, password, user_id }: IRequest): Promise<User | undefined> {

        const userAdmin = await this.usersRepository.findById(user_id);

        if (!userAdmin) {
            throw new Errors('User not found', 400);
        }

        if (!userAdmin.is_admin) {
            throw new Errors('No permission to register user', 403);
        }

        if(!userAdmin.company_id) {
            throw new Errors('Register a company first', 403);
        }

        // verificando se usuário comum não possui email cadastrado
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new Errors('Email address already used', 400);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            company_id: userAdmin.company_id,
        });
        
        return user;
    }
}

export default CreateUserService;