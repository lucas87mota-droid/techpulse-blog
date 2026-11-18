# TechPulse Backend

API Node.js/Express responsável por receber os e-mails da newsletter e gravá-los no Supabase. O front-end permanece separado em `client/`.

## Estrutura

```text
backend/
├── env.example
├── .gitignore
├── package.json
└── src/
    ├── lib/
    │   └── supabase.js
    ├── routes/
    │   └── inscritos.js
    └── server.js
```

## Requisitos

- Node.js 18 ou superior;
- Um projeto Supabase;
- A tabela `public.inscritos` criada com o script `../database/supabase.sql`.

## Instalação

Dentro da pasta `backend/`, execute:

```bash
npm install
```

Copie o modelo de configuração para um arquivo local chamado `.env`:

```bash
cp env.example .env
```

Preencha o `.env`:

```env
PORT=3333
FRONTEND_URL=http://localhost:5500
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-secreta
```

A `SUPABASE_SERVICE_ROLE_KEY` deve ficar apenas no servidor. Nunca a coloque no HTML, no JavaScript do navegador ou no GitHub.

## Executar localmente

Modo de desenvolvimento:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

O servidor ficará disponível em `http://localhost:3333`.

## Rotas

### `GET /`

Retorna uma mensagem básica da API.

### `GET /api/health`

Verifica se o backend está online.

### `POST /api/inscritos`

Cadastra um e-mail na tabela `inscritos`.

Exemplo de requisição:

```bash
curl -X POST http://localhost:3333/api/inscritos \
  -H "Content-Type: application/json" \
  -d '{"email":"leitor@example.com"}'
```

Respostas possíveis:

- `201`: cadastro realizado;
- `400`: e-mail inválido;
- `409`: e-mail já cadastrado;
- `500`: falha no Supabase ou no servidor.

## Integração com o front-end

No `client/app.js`, o formulário deve enviar o e-mail para:

```javascript
fetch("http://localhost:3333/api/inscritos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: $scope.novoInscrito.email
  })
});
```

Durante a publicação, troque a URL local pela URL pública do backend e atualize `FRONTEND_URL` com a URL pública do front-end.

## Publicação no Render

1. Suba o repositório no GitHub.
2. Crie um Web Service no Render apontando para a pasta `backend/` ou configure o diretório raiz como `backend`.
3. Use `npm install` como comando de instalação.
4. Use `npm start` como comando de inicialização.
5. Cadastre as variáveis `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` e `FRONTEND_URL` no painel do Render.
6. Não publique o arquivo `.env`.
