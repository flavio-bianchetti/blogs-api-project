# Trybe - Blogs API

This repository contains the "_Blogs API_" project, which consists of a CRUD blog post API, with Sequelize and database. The objective of this project is to build a backend using _[ORM with the Sequelize package](https://sequelize.org/)_, being able to create and associate tables using models, build and consume endpoints and make a CRUD with the ORM.


### Author:

- _[Flávio Bianchetti](https://www.linkedin.com/in/flaviobianchetti/)_

---

### Were used in the construction of this page:

<section>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img
      align="center"
      height="30"
      src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"
      target="_blank"
    />
  </a>
  <a href="https://sequelize.org/" target="_blank">
    <img
      align="center"
      height="30"
      src="https://img.shields.io/badge/Sequelize-663399?style=for-the-badge&logo=sequelize&logoColor=white"
      target="_blank"
    />
  </a>
  <a href="https://www.mysql.com/" target="_blank">
    <img
      align="center"
      height="30"
      src="https://img.shields.io/badge/MySQL-02569B?style=for-the-badge&logo=mysql&logoColor=white"
      target="_blank"
    />
  </a>
</section>

---

### Project page - Trybe:

You can find the project's original GitHub _[here](https://github.com/tryber/sd-015-b-project-blogs-api)_.

---

### Installation

1. Open the terminal, in a directory of your choice, and clone the project:
```bash
  git clone git@github.com:flavio-bianchetti/blogs-api-project.git
```

2. Enter the project directory:
```bash
  cd blogs-api-project
```
3. Install dependencies:
```bash
  npm install
```
4. The API uses the MySQL database to store the information. If you do not have MySQL installed, consult the documentation available _[here](https://dev.mysql.com/doc/)_ or change the file "_src/config/config.js_" to database of your choice.

5. Create the database:
```bash
  npx sequelize db:create
```
6. Create the tables:
```bash
  npx sequelize db:migrate
```
7. Feed the database:
```bash
  npx sequelize db:seed:all
```
8. Configure the _[dotenv](https://www.npmjs.com/package/dotenv)_ file with your information:
```javascript
  MYSQL_USER=db_username
  MYSQL_PASSWORD=db_password
  HOSTNAME=host_name // Ex.: localhost
  APP_PORT=number // Ex.: 3000
  JWT_SECRET=jwt_password
```
9. Launch the application:
```bash
  npm start
```

### API usage:

1. Register a new user (example: http://localhost:3000/user) by informing the fields _displayName_, _email_, _password_ and _image_ and receive as response the necessary token to access the application's resources:
![flavio-bianchetti-blogs-api-project](https://docs.google.com/uc?id=14cyssBbeor3Mhj7Hu-5cLpL4lGS1RSW1)

2. The token can also be received using the information already registered in the database, accessing the application (example: http://localhost:3000/login) informing _email_ and _password_:
![flavio-bianchetti-blogs-api-project](https://docs.google.com/uc?id=1e5NJ2ZiyRY8twC-SzNLMHkoqCeIUWxv0)

3. Use the token received in the '_Authorization_' key to access API resources:
![flavio-bianchetti-blogs-api-project](https://docs.google.com/uc?id=1DhdKZP8sgmQBcticdBNuA-L88hOOgfhN)

### Available resources:
- **Login:**
  - **POST /login**
    - **request:** { _email_, _password_ }.
    - **response:** receives the token or error message.
- **User:**
  - **POST /user**
    - **request:** { _displayName_, _email_, _password_, _image_ }.
    - **response:** receives the token or error message.
  - **GET - /user**
    - **header:** _Authorization_: token.
    - **response:** lists registered users or error message.
  - **GET - /user/:id**
    - **header:** _Authorization_: token.
    - **response:** lists user information or error message.
  - **DELETE - /user/me**
    - **header:** _Authorization_: token.
    - **response:** delete current user. Returns status _204_ on success or error message.
- **Categories:**
  - **POST /categories**
    - **header:** _Authorization_: token.
    - **request:** { _name_ }.
    - **response:** receives information about the new category or error message.
  - **GET - /categories**
    - **header:** _Authorization_: token.
    - **response:** lists the registered categories or error message.
- **Post:**
  - **POST /post**
    - **header:** _Authorization_: token.
    - **request:** { _title_, _content_, [_categoryIds_] }.
    - **response:** lists information about user, post and categories or error message.
  - **GET - /post**
    - **header:** _Authorization_: token.
    - **response:** lists registered posts or error message.
  - **GET - /post/:id**
    - **header:** _Authorization_: token.
    - **response:** lists information for the selected post or error message.
  - **PUT - /post/:id**
    - **header:** _Authorization_: token.
    - **request:** { _title_, _content_ }.
    - **response:** returns the changed post or error message.
  - **DELETE - /post/:id**
    - **header:** _Authorization_: token.
    - **response:** deletes informed post. Returns status _204_ on success or error message.
  - **GET - /post/search?q=:searchTerm**
    - **header:** _Authorization_: token.
    - **response:** lists post info or error message.

### Author's considerations:

- There is no schedule of changes planned for this project.

---

by _[Flávio Bianchetti - 2022](https://github.com/flavio-bianchetti)_.

---
---

# Versão em português - Trybe - Blogs API

Este repositório contém o projeto "_Blogs API_", que consiste em uma API de um CRUD posts de blog, com Sequelize e banco de dados. O objetivo deste projeto é a construção de um backend utilizando _[ORM com o pacote Sequelize](https://sequelize.org/)_, sendo capaz de criar e associar tabelas utilizando models, construir e consumir endpoints e fazer um CRUD com o ORM.

### Autor:

- _[Flávio Bianchetti](https://www.linkedin.com/in/flaviobianchetti/)_

---
### Foram utilizados na construção desta página:

<section>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img
      align="center"
      height="30"
      src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"
      target="_blank"
    />
  </a>
  <a href="https://sequelize.org/" target="_blank">
    <img
      align="center"
      height="30"
      src="https://img.shields.io/badge/Sequelize-663399?style=for-the-badge&logo=sequelize&logoColor=white"
      target="_blank"
    />
  </a>
  <a href="https://www.mysql.com/" target="_blank">
    <img
      align="center"
      height="30"
      src="https://img.shields.io/badge/MySQL-02569B?style=for-the-badge&logo=mysql&logoColor=white"
      target="_blank"
    />
  </a>
</section>

---
### Página do projeto - Trybe

Você pode encontrar o GitHub original do projeto _[aqui](https://github.com/tryber/sd-015-b-project-blogs-api)_.

---

### Instalação

1. Abra o terminal, em um diretório de sua preferência, e faça o clone do projeto:
```bash
  git clone git@github.com:flavio-bianchetti/blogs-api-project.git
```

2. Entre no diretório do projeto:
```bash
  cd blogs-api-project
```
3. Instale as dependências:
```bash
  npm install
```
4. A API utiliza o banco de dados MySQL para armazenar as informações. Caso não tenha o MySQL instalado, consulte a documentação disponível _[aqui](https://dev.mysql.com/doc/)_ ou altere o arquivo "_src/config/config.js_" para o banco de dados de sua preferência.

5. Faça a criação do banco de dados:
```bash
  npx sequelize db:create
```
6. Faça a criação das tabelas:
```bash
  npx sequelize db:migrate
```
7. Faça a alimentação do banco de dados:
```bash
  npx sequelize db:seed:all 
```
8. Configure o arquivo _[dotenv](https://www.npmjs.com/package/dotenv)_ com suas informações:
```javascript
  MYSQL_USER=db_username
  MYSQL_PASSWORD=db_password
  HOSTNAME=host_name // Ex.: localhost
  APP_PORT=number // Ex.: 3000
  JWT_SECRET=jwt_password
```
9. Inicie a aplicação:
```bash
  npm start 
```

### Utilização da API:

1. Faça o cadastro de um novo usuário (exemplo: http://localhost:3000/user) informando o campos _displayName_, _email_, _password_ e _image_ e receba como resposta o token necessário para acessar os recursos da aplicação:
![flavio-bianchetti-blogs-api-project](https://docs.google.com/uc?id=14cyssBbeor3Mhj7Hu-5cLpL4lGS1RSW1)

2. O token pode também ser recebido utilizando as informações já cadastradas no banco de dados, acessando a aplicação (exemplo: http://localhost:3000/login) informando _email_ e _password_:
![flavio-bianchetti-blogs-api-project](https://docs.google.com/uc?id=1e5NJ2ZiyRY8twC-SzNLMHkoqCeIUWxv0)

3. Utilize o token recebido na chave '_Authorization_' para acessar os recursos da API:
![flavio-bianchetti-blogs-api-project](https://docs.google.com/uc?id=1DhdKZP8sgmQBcticdBNuA-L88hOOgfhN)

### Recursos disponíveis:
- **Login:**
  - **POST /login**
    - **request:** { _email_, _password_ }.
    - **response:** recebe o token ou mensagem de erro.
- **User:**
  - **POST /user**
    - **request:** { _displayName_, _email_, _password_, _image_ }.
    - **response:** recebe o token ou mensagem de erro.
  - **GET - /user**
    - **header:** _Autorization_: token.
    - **response:** lista os usuários cadastrados ou mensagem de erro.
  - **GET - /user/:id**
    - **header:** _Autorization_: token.
    - **response:** lista informações do usuário ou mensagem de erro.
  - **DELETE - /user/me**
    - **header:** _Autorization_: token.
    - **response:** apaga usuário atual. Retorna status _204_ em caso de sucesso ou mensagem de erro.
- **Categories:**
  - **POST /categories**
    - **header:** _Autorization_: token.
    - **request:** { _name_ }.
    - **response:** recebe informações sobre a nova categoria ou mensagem de erro.
  - **GET - /categories**
    - **header:** _Autorization_: token.
    - **response:** lista as categorias cadastradas ou mensagem de erro.
- **Post:**
  - **POST /post**
    - **header:** _Autorization_: token.
    - **request:** { _title_, _content_, [_categoryIds_] }.
    - **response:** lista informações sobre o usuário, postagem e categorias ou mensagem de erro.
  - **GET - /post**
    - **header:** _Autorization_: token.
    - **response:** lista as postagens cadastradas ou mensagem de erro.
  - **GET - /post/:id**
    - **header:** _Autorization_: token.
    - **response:** lista informações da postagem selecionada ou mensagem de erro.
  - **PUT - /post/:id**
    - **header:** _Autorization_: token.
    - **request:** { _title_, _content_ }.
    - **response:** retorna a postagem alterada ou mensagem de erro.
  - **DELETE - /post/:id**
    - **header:** _Autorization_: token.
    - **response:** apaga postagem informada. Retorna status _204_ em caso de sucesso ou mensagem de erro.
  - **GET - /post/search?q=:searchTerm**
    - **header:** _Autorization_: token.
    - **response:** lista informações das postagens ou mensagem de erro.

### Considerações do autor:

- Não há calendário de alterações previstas para este projeto.

---

por _[Flávio Bianchetti - 2022](https://github.com/flavio-bianchetti)_.
