
# Moview

Este projeto consiste em uma aplicação web que fornece o acesso ao usuário para um dos maiores acervos de filmes presentes na internet e permite que ele crie lista uma lista de filmes baseada em suas escolhas.


## Funcionalidades

- Adição e remoção de filmes à lista
- Pesquisa de filmes
- Visualizar detalhes do filme


## Instalação

Instale o Moview com npm

```bash
  cd moview-list
  npm install
```
    
## Stack utilizada

**Front-end:** React, Redux, TailwindCSS

**Back-end:** Serverless framework


## Arquitetura

Arquitetura feita utilizando os serviços cloud da AWS.

- Como distribuidor de conteúdo foi utilizado o AWS CloufFront
- Para hospedagem dos aquivos estáticos da aplicação, foi utilizado o serviço S3
- Como provedor de API foi foi utilizado o API Gateway em conjunto com funções lambda seguindo a arquitetura Serverless
- Como banco de dados foi utilizado o DynamoDB
- Como gerenciador de usuários foi utilizado o Cognito


## Autores

- [@Juan-Augusto](https://github.com/Juan-Augusto)


## Repositório back-end

- [moview-backend](https://github.com/Juan-Augusto/moview-backend/tree/master)
