import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateAdminUserDTO from '../dtos/ICreateAdminUserDTO';



export default interface IUsersRepository {
    
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findUsersByCompanyId(company_id: string): Promise<User[]>;
    create(data: ICreateUserDTO): Promise<User | undefined>;
    createAdmin(userData: ICreateAdminUserDTO): Promise<User>
    save(user: User): Promise<User>;
    
}