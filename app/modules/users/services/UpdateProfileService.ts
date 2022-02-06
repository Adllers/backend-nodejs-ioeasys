import { inject, injectable } from 'tsyringe';

import Errors from '@shared/errors/Errors';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}
@injectable()
class UpdateProfileService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {};

    public async execute({ user_id, name, email, password, old_password}: IRequest): Promise<User> {
        
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
           throw new Errors('User not found'); 
        }


        const userEmailAlreadyExists = await this.usersRepository.findByEmail(email); 
        
        if (userEmailAlreadyExists && userEmailAlreadyExists.id != user_id) {
            throw new Errors('Email already exists');
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new Errors('Where is the old password?');
        }

        if (password && old_password) {

            const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

            if (!checkOldPassword) {
                throw new Errors('Old password does not match');
            }

            if (checkOldPassword) {
                user.password = await this.hashProvider.generateHash(password);
            }
        }

        await this.usersRepository.save(user);

        return user;
    };
}

export default UpdateProfileService;