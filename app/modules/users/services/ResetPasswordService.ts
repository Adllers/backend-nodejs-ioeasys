import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import User from '@modules/users/infra/typeorm/entities/User';
import Errors from '@shared/errors/Errors';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    password: string;
    token: string
}
@injectable()
class ResetPasswordEmailService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private usertokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {};

    public async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.usertokensRepository.findByToken(token);

        if (!userToken) {
            throw new Errors("User token does not exists!");
        }

        const user = await this.usersRepository.findById(userToken?.user_id);

        if(!user) {
            throw new Errors("User does not exists!");
        }

        const tokenCreatedAt = userToken.created_at;

        //adicionando 2 horas, assim o token tem validade de 2 horas
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new Errors('Token expired!');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordEmailService;