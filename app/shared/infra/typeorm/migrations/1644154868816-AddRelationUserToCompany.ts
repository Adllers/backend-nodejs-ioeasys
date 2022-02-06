import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddRelationUserToCompany1644154868816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.addColumn('users', new TableColumn({
            name: 'company_id',
            type: 'uuid',
            isNullable: true,
        }));

        await queryRunner.createForeignKey('users', new TableForeignKey({
        
            name: 'UserCompany', //nome da chave estrangeira
            columnNames: ['company_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'companies',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',

            //RESTRICT -> não deixa o usuário ser deletado
            //SET NULL -> vai setar a variável para nulo 
            //CASCADE -> alteração propagada nas duas tabelas
         
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('users', 'UserCompany');
        await queryRunner.dropColumn('users', 'company_id');
    }

}
