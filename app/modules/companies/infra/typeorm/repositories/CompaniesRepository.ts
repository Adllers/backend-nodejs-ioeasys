import Company from '../entities/Company';
import { getRepository, Repository } from 'typeorm';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

class CompaniesRepository implements ICompaniesRepository {

    private ormRepository:Repository<Company>;

    constructor() {
        
        this.ormRepository = getRepository(Company);
    }

    public async findByName(name: string): Promise<Company | undefined> {
        
        const company = await this.ormRepository.findOne({
            where: { name },
        });

        return company;
    }

    public async findByEmail(email: string): Promise<Company | undefined> {
        
        const company = await this.ormRepository.findOne({
            where: { email },
        });

        return company;
    }


    public async create({ name, email }: ICreateCompanyDTO): Promise<Company> {
        
        const appointment = this.ormRepository.create({ name, email });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default CompaniesRepository;