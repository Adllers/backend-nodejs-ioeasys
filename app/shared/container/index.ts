import { container } from 'tsyringe';

// relativo a instância do hashProvider que usa bcrypt no password
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

