import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import Company from '@modules/companies/infra/typeorm/entities/Company';
//Vamos relacionar esse model com a tabela do typeorm

import { Exclude } from 'class-transformer';

// Entidade de usuários
@Entity('users')
class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    is_admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    company_id: string;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id'})
    company: Company;
    
}

export default User;