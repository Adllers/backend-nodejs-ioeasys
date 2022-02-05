import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import Errors from '@shared/errors/Errors';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;  
    token: string;
}

@injectable()
class AuthenticateUserService {
    
    constructor(

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

    ) {};
    
    public async execute ({ email, password}: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Errors('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!passwordMatched) {
            throw new Errors('Incorrect email/password combination.', 401);
        }

        // o token é gerado apartir da chave 3a7f471a5523588b2f2009abd0f16e2b através da lib jsonwebtoken
        // esse user.id é identificado através das requisições em que se usa o token
        // Então, quando fazemos um get, nós passamos somente o token que traz por informação esse user.id que traz outras infos do user que fez autenticação
        // O middleware ensureAuthenticate ajuda nesse processo
        const token = sign({ }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        })

        // Usuário está autenticado
        return { 
            user, 
            token 
        };

    }
}

export default AuthenticateUserService;