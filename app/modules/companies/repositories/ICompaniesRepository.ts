import Company from '../infra/typeorm/entities/Company';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

export default interface IAppointmentsRepository {
    create(data:ICreateCompanyDTO): Promise<Company>;
    findByEmail(email: string): Promise<Company | undefined>;
    findByName(name: string): Promise<Company | undefined>;  
}