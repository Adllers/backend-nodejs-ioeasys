# TESTE

### Rodar o Projeto

- instalar as dependências do projeto
    > **yarn install**

- utilizando a última versão do postgresql com docker
    > **docker run --name ioeasys_postgres -e POSTGRES_PASSWORD=ioeasys -p 5432:5432 -d postgres**
    
    obs: A porta 5432 do seu sistema precisa estar disponível

    Ao editar a conexão na ferramenta de acesso ao Banco de Dados:
    - Host: localhost
    - Port: 5432
    - Database: postgres
    - Username: postgres
    - Password: ioeasys

    Criar banco de dados na ferramenta de acesso ao Banco de Dados
    - nome do Banco de Dados: ioeasys_postgres


- comando para inicializar o servidor expressJS
    > **yarn dev**

### Consulta de API

- http://localhost:3333/api-docs

### Requisitos Não Funcionais

- [x] Api construída em NodeJS
- [x] ExpressJS
- [x] API REST
- [x] Utilizar algum ORM (Sequelize, TypeORM, Mongoose, etc...)
- [x] Banco Relacional (MySQL, MariaDB, PostgreSQL)
- [ ] Banco Não Relacional (MongoDB)
- [x] Usar algum (Postman, Insomnia, Swagger) 
- [x] Autenticação JWT com formato "Bearer token"
- [x] Javascript ou Typescript

### Gerenciamento de Empresas e Usuários
- Usuário admin pode se cadastrar no sistema.
- Usuário admin pode criar uma única empresa ao qual ele será o administrador.
- O Usuário admin deve cadastrar uma empresa antes de cadastrar os funcionários.
- A empresa deve ser única e terá os usuários vinculados a ela através do cadastro feito pelo Usuário admin

- usuário deve ser único, utilizando o email como referência. Se já existir um email, deve ser impedido de fazer cadastro.
- usuário pode solicitar redefinição de senha.
- usuário pode resetar sua senha. 
- usuário pode verificar os seus dados de perfil.

