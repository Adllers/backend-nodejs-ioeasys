# TESTE

### API em NodeJS para Teste

- Essa é uma API para um simples gerenciamento de usuários e empresas que visa prioritariamente cumprir os requisitos não funcionais exigidos para o teste.

### Requisitos Não Funcionais

- [x] Api construída em NodeJS
- [x] ExpressJS
- [x] API REST
- [x] Utilizar algum ORM (Sequelize, TypeORM, Mongoose, etc...)
- [x] Banco de Dados Relacionais Permitidos (MySQL, MariaDB, PostgreSQL)
- [x] Usar (Postman ou Insomnia ou Swagger) 
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

- Usuário admin deve ser criado antes da empresa e de um usuário comum
- Usuário admin deve criar primeiro uma empresa antes de cadastrar os funcionários dessa empresa
- Quando usuário admin cadastrar uma empresa, ele deve ser o administrador da empresa
- Empresas cadastradas devem ser únicas
- Usuários cadastrados devem ser únicos
- Usuário não admin só pode ser criado por usuário admin
- Usuário não admin deve ser criado por usuário admin na mesma empresa em que o usuário admin está vinculado
- O email será o validador de usuário e empresa única
- Qualquer usuário não pode ser criado se já existir um email
- Ao atualizar o perfil de usuário, o usuário não pode alterar seu email para um email já existente
- Ao atualizar a sua senha, o usuário deve informar a senha antiga e a nova senha
- No console.log é possível acessar o email em desenvolvimento através de uma link


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


### Consulta de APIs

observações:

- Foi utilizado o Insomnia

- Existe um arquivo "Insomnia_Adllers" no formato Insomnia v4 (JSON) no root do projeto que pode ser usado para testar.

- A rota para "criar usuário admin" está sem autenticação, pois a ideia é somente inserir um usuário admin para o consumo das demais rotas da aplicação. 

- considerar "rootURL" = http://localhost:3333

- O caminho feliz pode ser executado na sequência 1, 2, 3 e 4
 

#### 1 - Criar Usuário Admin

- não autenticada, como já explicado nas observações

- request do Insomnia -> users/create admin

- rota -> rootURL/users/admin
- método -> POST
- Body -> JSON -> { "name": "digitealgum", "email" : "digitealgum@teste.com", "password": "digitealgum" }
- retorna usuário admin

#### 2 - Autenticar Usuário Admin

- não autenticada

- request do Insomnia -> sessions/authenticate

- rota -> rootURL/sessions
- método -> POST
- Body -> JSON -> { "email" : "digitealgum@teste.com", "password": "digitealgum" }
- retorna usuário admin e token para ser repassado nas rotas autenticadas



#### 3 - Criar empresa por usuário Admin

- autenticada por usuário admin

- request do Insomnia -> companies/create by admin user

- rota -> rootURL/company
- método -> POST 
- Body -> JSON -> { "name" : "empresa", "email": "empresa@teste.com" }
- retorna a empresa


#### 4 - Criar usuário comum 

- autenticada por usuário admin

- request do Insomnia -> users/create common user

- rota -> rootURL/users
- método -> POST
- Body -> JSON -> { "name": "digitealgumusuariocomum", "email" : "digitealgumusuariocomum@test.com", "password": "digitealgumusuariocomum" }
- retorna usuário não admin

#### 5 - Ver dados de Perfil

- autenticada por qualquer usuário 

- request do Insomnia -> users/show profile

- rota -> rootURL/profile
- método -> GET

- retorna usuário


#### 6 - Atualizar perfil de usuário

- autenticada por qualquer usuário 

- request do Insomnia -> users/update user

- rota -> rootURL/profile
- método -> PUT
- Body -> JSON -> { "name": "usuario", "email" : "usuario", "old_password": "usuario@teste.com", "password": "usuario@teste.com", "password_confirmation": "usuario@teste.com" }

- retorna usuário


#### 7 - Obter usuários da empresa do usuário admin

- autenticada com usuário admin 

- request do Insomnia -> companies/get users

- rota -> rootURL/company/users
- método -> GET

- retorna array de usuários


#### 8 - Pedir alteração de senha

- não autenticada

- request do Insomnia -> sessions/forgot password

- rota ->  rootURL/password/forgot
- método -> POST
- Body -> JSON -> { "email": "digitealgumusuario@teste.com" }

- No console.log é possível acessar o email através de um link. Sendo preciso pegar o token para mudar a senha.

#### 9 - Mudar senha

- não autenticada

- request do Insomnia -> sessions/reset password

- rota ->  rootURL/password/reset
- método -> POST
- Body -> JSON -> { "password": "usuario@teste.com", "password_confirmation": "usuario@teste.com", "token": "string do email" }





