# TESTE

### API em NodeJS para Teste

- Essa é uma API para um simples gerenciamento de usuários e empresas que visa prioritariamente cumprir os requisitos não funcionais exigidos para o teste.

### Requisitos Não Funcionais

- [x] Api construída em NodeJS
- [x] ExpressJS
- [x] API REST
- [x] Utilizar algum ORM (Sequelize, TypeORM, Mongoose, etc...)
- [x] Banco de Dados Relacionais Permitidos (MySQL, MariaDB, PostgreSQL)
- [x] Usar algum (Postman, Insomnia, Swagger) 
- [x] Autenticação JWT com formato "Bearer token"
- [x] Javascript ou Typescript

### Requisitos Funcionais

- Usuário admin pode-se cadastrar no sistema
- Usuário admin pode cadastrar a sua empresa em que trabalha
- Usuário admin pode cadastrar um usuário não admin na empresa em que trabalha
- Usuário admin pode obter e ver todos os usuários cadastrados na empresa em que trabalha
- Usuário não admin pode ser cadastrado por usuário admin
- Usuário não admin ou usuário admin pode atualizar os dados do seu perfil
- Usuário admin ou usuário não admin pode ver o seu perfil
- Usuário admin ou usuário não admin podem fazer login se autenticando
- Usuário admin ou usuário não admin podem pedir recuperação de senha através de seu email
- Usuário admin ou usuário não admin podem modificar a senha após pedido de recuperação de senha

### Regras de Negócio

- Usuário admin deve ser criado primeiro
- Usuário admin deve criar primeiro uma empresa antes de cadastrar os funcionários dessa empresa
- Quando usuário admin cadastrar uma empresa, ele deve ser o administrador da empresa
- Usuário não admin só pode ser criado por usuário admin
- Usuário não admin deve ser criado por usuário admin na mesma empresa em que o usuário admin está vinculado
- O email será o validador de usuário e empresa única
- Qualquer usuário não pode ser criado se já existir um email
- Ao atualizar o perfil de usuário, o usuário não pode alterar seu email para um email já existente
- Ao atualizar a sua senha, o usuário deve informar a senha antiga e a nova senha


### Rodar o Projeto

- instalar as dependências do projeto
    > **yarn install**

- utilizando postgresql com docker
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





Requisitos

### API em NodeJS para gerenciamento de empresas e usuários
- Usuário admin pode se cadastrar no sistema.
- Usuário admin pode criar uma única empresa ao qual ele será o administrador.
- Usuário admin pode ver todos os usuários vinculados a sua empresa.
- O Usuário admin deve cadastrar uma empresa antes de cadastrar os funcionários.
- A empresa deve ser única e terá os usuários vinculados a ela através do cadastro feito pelo Usuário admin.

- usuário deve ser único, utilizando o email como referência. Se já existir um email, deve ser impedido de fazer cadastro.
- usuário pode solicitar redefinição de senha.
- usuário pode resetar sua senha. 
- usuário pode verificar os seus dados de perfil.
- usuário pode atualizar seus dados de perfil.



