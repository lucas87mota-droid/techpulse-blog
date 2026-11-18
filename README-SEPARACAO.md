# TechPulse — separação da aplicação

## Arquitetura

```text
client/   → páginas HTML, CSS, AngularJS e imagens
backend/  → API Node.js/Express
Supabase  → banco PostgreSQL para inscritos
```

## Responsabilidades

- O front-end consome a API externa de notícias.
- O front-end envia o e-mail da newsletter para o backend.
- O backend valida o e-mail e grava o registro no Supabase.
- A chave secreta do Supabase fica somente no backend.

## Execução

### Front-end

Execute o servidor estático do projeto ou abra o `client/` por um servidor local.

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Consulte `backend/README.md` para a configuração completa.
