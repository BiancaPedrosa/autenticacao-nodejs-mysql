# Autenticação — Node.js + Express + EJS + MySQL

Material didático de autenticação de usuários (registro, login e sessão), usando **mysql2** com queries SQL diretas (sem ORM). Feito para acompanhar os slides da aula.

## Stack

- Node.js + Express
- EJS (motor de views)
- MySQL, com o driver `mysql2` (queries SQL diretas, sem ORM)
- bcryptjs (hash de senha)
- express-session (sessão de login)
- dotenv (variáveis de ambiente)

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```

2. Crie o banco e a tabela no seu servidor MySQL, usando o script em `sql/schema.sql`:
   ```
   mysql -u root -p < sql/schema.sql
   ```

3. Copie `.env.example` para `.env` e preencha com suas credenciais do MySQL:
   ```
   cp .env.example .env
   ```

4. Rode o servidor:
   ```
   npm start
   ```

5. Acesse `http://localhost:3000/register` para criar uma conta, depois `http://localhost:3000/login`.

## Estrutura

```
/auth-site
├── controllers/
│   └── authController.js   # Lógica de registro, login...
├── models/
│   └── user.js              # Funções de acesso ao banco (SQL)
├── routes/
│   └── authRoutes.js        # Definição das rotas HTTP
├── views/
│   ├── login.ejs             # View da página de login
│   ├── register.ejs          # View da página de registro
│   └── dashboard.ejs         # View do dashboard
├── config/
│   └── database.js          # Configuração da conexão MySQL
├── sql/
│   └── schema.sql            # Script de criação do banco e da tabela
├── .env.example
├── app.js                     # Arquivo principal da aplicação
└── package.json
```

## Aviso

Este projeto é material didático (nível iniciante). Antes de usar em produção, vale reforçar: validação de campos no back-end, mensagens de erro mais detalhadas, rate limiting no login, e cookies de sessão com `secure`/`httpOnly` configurados para HTTPS.
