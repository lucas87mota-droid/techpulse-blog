# TechPulse — Blog de Tecnologia

O TechPulse é um blog de tecnologia desenvolvido como projeto acadêmico. A aplicação apresenta notícias, categorias e uma página de leitura individual.

O projeto possui front-end separado de um back-end Node.js/Express e utiliza o Supabase para armazenar os e-mails cadastrados na newsletter.

## Funcionalidades

- Página inicial com notícias;
- Página de categorias;
- Página de leitura individual;
- Consumo de notícias por API;
- Imagens locais para as publicações;
- Formulário de inscrição na newsletter;
- Validação de e-mail;
- Cadastro dos inscritos no Supabase;
- API própria com Node.js e Express;
- Endpoint de verificação do servidor;
- Layout responsivo com Bootstrap.

## Tecnologias utilizadas

### Front-end

- HTML5;
- CSS3;
- Bootstrap 5;
- JavaScript;
- AngularJS;
- API REST.

### Back-end

- Node.js;
- Express;
- CORS;
- Dotenv;
- Supabase JavaScript Client.

### Banco de dados

- Supabase;
- Tabela `inscritos`;
- Políticas de segurança RLS.

## Estrutura do projeto

```text
Techpulse blog/
├── backend/
│   ├── src/
│   │   ├── lib/
│   │   │   └── supabase.js
│   │   ├── routes/
│   │   │   └── inscritos.js
│   │   └── server.js
│   ├── env.example
│   ├── package.json
│   └── README.md
├── database/
│   └── supabase.sql
├── IMG/
├── app.js
├── categoria.html
├── index.html
├── leitura.html
├── style.css
└── README.md

```
## Como executar o backend

Entre na pasta do backend:

```cmd
cd backend
```

Instale as dependências:

```cmd
npm install
```

Copie `env.example` e renomeie a cópia para:

```text
.env
```

Inicie o backend:

```cmd
npm run dev
```

O servidor será iniciado em:
http://localhost:3333

## Rotas da API

### Verificação do servidor

```http
GET /api/health
```

Resposta:

```json
{
  "status": "ok",
  "servico": "techpulse-backend"
}
```

### Cadastro de inscrito

```http
POST /api/inscritos
```

Corpo da requisição:

```json
{
  "email": "leitor@example.com"
}
```

Possíveis respostas:

- `201`: e-mail cadastrado;
- `400`: e-mail inválido;
- `409`: e-mail já cadastrado;
- `500`: erro no servidor ou no Supabase.
## Banco de dados

A tabela utilizada pelo sistema é:

```text
inscritos
```

Ela possui as seguintes colunas:

```text
id
email
data_cadastro
```

O script de criação está em:

```text
database/supabase.sql
```

Segurança
O arquivo .env está protegido pelo .gitignore e não deve ser enviado ao GitHub.

A chave secreta do Supabase é utilizada somente no backend. Ela não deve ser inserida em:
index.html;
app.js;
style.css;
imagens;
README;
repositório público.

## Arquitetura da aplicação

```text
Usuário
   ↓
Front-end HTML/CSS/JavaScript
   ↓
API Node.js/Express
   ↓
Supabase
   ↓
Tabela inscritos
```
## Autor

Projeto acadêmico desenvolvido por Lucas Mota.

