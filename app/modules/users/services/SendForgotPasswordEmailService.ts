import { inject, injectable } from 'tsyringe';
import path from 'path';

import Errors from '@shared/errors/Errors';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    email: string;
}
@injectable()
class SendForgotPasswordEmailService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private usertokensRepository: IUserTokensRepository,
    ) {};

    public async execute({ email }: IRequest): Promise<void> {

        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new Errors('User does not exists');
        }

        const { token } = await this.usertokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: 'Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
                }
            } ,

        });   

    }
}

export default SendForgotPasswordEmailService;