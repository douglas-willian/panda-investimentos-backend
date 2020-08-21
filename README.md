<h1 align="center">
  Panda Investimentos Backend
</h1>

<br>

## 💻 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias e bibliotecas:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [ExpressJS](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [Knex](http://knexjs.org/)
- [SQLite](https://www.sqlite.org/index.html) - Para desenvolvimento
- [PostgreSQL](https://www.postgresql.org/) - Para Produção
- [Jest](https://jestjs.io/) - Para testes
- [ESLint](https://eslint.org/)

## 💻 Projeto

Projeto desenvolvido para o Teste Gorila - Full-Stack

## 💻 Instruções

Para rodar o projeto, primeiro clone o repositório na sua máquina (`git clone`), entre na pasta ( `cd panda-investimentos-backend` ), e execute o comando `npm install` no terminal para instalar todas as dependências. 

Depois de instalado, execute o comando `npm start` para iniciar a aplicação.

Para rodar os testes, é necessário definir manualmente a constante `env` no arquivo `src/database/connection.js` como `development`, pois o knex não lê as váriaveis de ambiente diretamente do `.env` nesse arquivo.
Depois, popule o banco de dados local (sqlite) com os dados para as validações, feito isso, execute o comand `npm test` 

Para conferir o projeto em produção com Heroku, acesse o link https://panda-investimentos-frontend.herokuapp.com/

## Obs.: Arquivo .env presente somente para os devidos testes locais

---
