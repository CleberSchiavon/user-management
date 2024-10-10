# User Management

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![EditorConfig](https://img.shields.io/badge/Editor%20Config-E0EFEF?style=for-the-badge&logo=editorconfig&logoColor=000)

![Tailwind-CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Iniciar o projeto

Iniciar o projeto e instalar suas dependencias é muito simples!

```sh
yarn run prepare-repo
```

PS: Caso estiver utilizando Mac e não conseguir instalar o Yarn por erro de permissão, tente rodar o comando de instalação utilizando SUDO

```sh
sudo npm install -g yarn
```

Pronto! Todo o enviroment está pronto e configurado

Agora rode o seguinte comando pra iniciar o repositório em modo de desenvolvimento

```sh
yarn run dev
```

## Apps e Pacotes

- `@repo/ui - packages/ui`: Aqui fica todos os componentes que são utilizados na aplicação
- `@repo/eslint-config - packages/eslint-config`: Configurações do ESLINT
- `@repo/typescript-config - packages/typescript-config`: Todos os TSConfigs utilizados na aplicação ficam aqui

## Features

Esse repositório contém

- TurboRepo
- Node.JS
- Nest.JS
- Next.JS
- TailwindCSS
- ShadCN
- TypeScript
- Yarn
- Swagger
- Jest and Supertest
- Prettier and Eslint
- Husky with Conventional Commits
- Standard Version
- Editor Config
- Class Validations (DTO's)
- Solidarity

## Dev Features

- 📈 Absolute Import and Path Alias — Uma alternativa do typescript pra importar arquivos sem precisar de "../../", ao invés disso usamos "~/(pasta)"
- 📏 ESLint — O ESLint serve pra procurar problemas de escrita dentro do código (pode ser personalizado conforme as vontades do usuário)
- 💖 Prettier and Eslint — Formata o código automaticamente com os padrões definidos do usuário
- 🐶 Husky, Lint Staged — Serve pra rodar uma série de scripts nos arquivos prestes a commitar ou a subir
- 🤖 Conventional Commit Lint — Serve pra conferir se os commits estão sendo feitos usando Conventional Commit (https://www.conventionalcommits.org/en/v1.0.0/)
- ⏰ Standard Version — Gera um changelog automatico a cada build, mostrando todas as mudanças que foram feitas
- 🟢 Swagger - Todos os endpoints estão documentados no swagger (path: "/swagger")
- 💻 Repo Scripts - Uma série de scripts localizadas na pasta /scripts e no package.json que automatiza grande parte dos processos do dia a dia do dev
- ⏰ Release Please — Action do GitHub que gera um changelog automatico a cada build, mostrando todas as mudanças que foram feitas com base nos conventional commits
- 🌞 Solidarity - Biblioteca NPM que faz a verificação de todos os requisitos de ambiente para rodar o repositório (arquivo .solidarity na raiz do projeto)
- TurboRepo - Gestão inteligente de todo o repositório (Build System)

## Comandos Uteis

Esse repositório contém vários comandos uteis na Raiz do projeto, para acelerar todo o processo de desenvolvimento

### Comandos utéis

```sh
yarn run dev # Roda o projeto em modo de desenvolvimento
```

```sh
yarn run lint-all # Roda o ESLint e o Prettier em todo o projeto
```

```sh
yarn run env-check # Roda o Solidarity pra checar se seu ambiente dá match com os requisitos do repositório
```

```sh
yarn run branch-check # Valida se o nome da sua branch dá match com o padrão da invillia
```

```sh
yarn run clean-repo # Remove todos os node_modules e dependencias instaladas do aplicativo, esse comando é util pra quando o dev precisar de reinstalar o repositório por algum motivo
```

### Comandos da API

```sh
yarn run api:dev # Rodar APENAS a API em modo de desenvolvimento
```

```sh
yarn run api:test # Rodar todos os testes da API
```

```sh
yarn run api:test-watch # Rodar todos os testes da API no modo Watch do Jest
```

## Autor

 <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 15px">
 <a href="https://www.linkedin.com/in/cleberschiavon">
 <b>Cleber Henrique</b>
</a>
 <a href="mailto:cleberschiavon@outlook.com">
cleberschiavon@outlook.com
</a>
 </div>

[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cleberschiavon)
