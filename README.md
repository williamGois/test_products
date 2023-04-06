# API de Gerenciamento de Produtos

Esta API é utilizada para gerenciar produtos. É possível realizar as operações de cadastro, edição, visualização e exclusão de produtos. Além disso, a API oferece funcionalidades para autenticação de usuários.

## Tecnologias usadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) 
- [Mongoose](https://mongoosejs.com/) 
- [Jest](https://jestjs.io/) 

## Instalação

1. Clone o repositório em sua máquina local.
2. Execute o comando npm install para instalar todas as dependências do projeto.
3. Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente necessárias, como a URL do banco de dados MongoDB e a chave secreta para geração de tokens JWT.
4. Execute o comando **npm start** para iniciar o servidor em modo de desenvolvimento.
5. Execute o comando **npm test** para rodar os testes automatizados.

### Endpoints

#### POST /api/auth/register

Cadastra um novo usuário na API.

**Parâmetros**:

* **name** (obrigatório): nome do usuário.
* **email** (obrigatório): e-mail do usuário.
* **password** (obrigatório): senha do usuário.

## POST /api/auth/login

Realiza o login de um usuário na API.

Parâmetros:

* **email** (obrigatório): e-mail do usuário.
* **password** (obrigatório): senha do usuário.

- **Header**
    Authorization: Bearer JWT

Retorno.

Retorna um objeto JSON contendo um token JWT válido por 1 hora.

## POST GET /api/products

Retorna todos os produtos cadastrados na API.

Retorno:

Retorna um array de objetos JSON, onde cada objeto representa um produto cadastrado na API.

## GET /api/products/:id

Retorna um produto específico cadastrado na API.

**Parâmetros**:

* **id** (obrigatório): ID do produto a ser retornado.

**Retorno**:

Retorna um objeto JSON contendo as informações do produto.

## POST /api/products

Cadastra um novo produto na API.

**Parâmetros**:

* **name** (obrigatório): nome do produto.
* **description** (opcional): descrição do produto.
* **price** (obrigatório): preço do produto.
* **category** (obrigatório): ID da categoria do produto.

- **Header**
    Authorization: Bearer JWT

## PUT /api/products/:id

Atualiza as informações de um produto cadastrado na API.

**Parâmetros**:

* **id** (obrigatório): ID do produto a ser atualizado.
* **name** (opcional): novo nome do produto.
* **description** (opcional): nova descrição do produto.
* **price** (opcional): novo preço do produto.
* **category** (opcional): novo ID da categoria do produto.

## DELETE /api/products/:id

Exclui um produto cadastrado na API.

Parâmetros:

* **id** (obrigatório): ID do produto a ser excluído.

- **Header**
    Authorization: Bearer JWT