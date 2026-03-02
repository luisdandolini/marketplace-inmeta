# Cards Marketplace

Marketplace de troca de cartas desenvolvido como desafio técnico para a INMETA.

🔗 **[Demo ao vivo](https://marketplace-inmeta.vercel.app/)**

---

## Funcionalidades

- Registro e login de usuários
- Adicionar cartas à coleção pessoal
- Criar solicitação de troca (wizard em 3 etapas)
- Deletar solicitações de troca criadas pelo usuário
- Marketplace público acessível a visitantes não autenticados
- Modal de detalhes de cada carta com nome e descrição completa
- Infinite scroll na listagem de cartas e trocas
- Sidebar responsiva com drawer no mobile
- Tema dark/light com animação circular via View Transitions API

---

## Tecnologias

| Camada          | Tecnologia               |
| --------------- | ------------------------ |
| Framework       | React 18 + TypeScript    |
| Roteamento      | React Router v6          |
| Estado global   | Zustand                  |
| Estado servidor | TanStack Query v5        |
| Formulários     | React Hook Form + Zod    |
| HTTP            | Axios                    |
| Estilização     | Tailwind CSS v4          |
| Ícones          | Lucide React             |
| Variantes CSS   | Class Variance Authority |
| Build           | Vite                     |
| Deploy          | Vercel                   |

---

## Arquitetura

O projeto segue uma **arquitetura feature-based**, onde cada funcionalidade é isolada em sua própria pasta com suas responsabilidades bem definidas:

```
src/
├── features/
│   ├── auth/          # Login, registro, store do token
│   ├── me/            # Dados do usuário logado (/me)
│   ├── card/          # Listagem e gerenciamento de cartas
│   ├── trades/        # Solicitações de troca (wizard, listagem, deleção)
│   └── theme/         # Store do tema dark/light
├── shared/
│   ├── components/    # Button, Input, Toast, Sidebar, Layout...
│   ├── hooks/         # useInfiniteScroll
│   └── lib/           # Axios instance, QueryClient
├── pages/             # Páginas da aplicação
└── routes/            # Configuração de rotas públicas e privadas
```

### Separação de responsabilidades

- **`features/auth`** — autenticação pura (login, register, token)
- **`features/me`** — dados do perfil do usuário logado
- **`features/card`** — cartas do sistema e da coleção do usuário
- **`features/trades`** — trocas com wizard de criação e store Zustand
- **`features/theme`** — preferência de tema do usuário persistida no localStorage

### Gerenciamento de estado

- **Zustand** — estado local da aplicação que não vem de API (token de autenticação, estado do wizard de criação de troca)
- **TanStack Query** — estado do servidor (dados que vêm de requisições), com cache configurado

---

## Cache

O cache foi implementado via TanStack Query com as seguintes estratégias:

| Query           | staleTime                 | Motivo                                             |
| --------------- | ------------------------- | -------------------------------------------------- |
| `GET /cards`    | 10 minutos                | Lista global raramente muda                        |
| `GET /me`       | 5 minutos                 | Perfil do usuário muda pouco                       |
| `GET /me/cards` | 5 minutos (padrão global) | Invalidado automaticamente ao adicionar cartas     |
| `GET /trades`   | 5 minutos                 | Invalidado automaticamente ao criar/deletar trocas |

O `staleTime` padrão de 5 minutos é configurado globalmente no `QueryClient`, evitando requisições desnecessárias à API (que hiberna após 30s de inatividade).

---

## Tratamento de erros

Os erros são tratados globalmente via interceptor do Axios:

- **401 Unauthorized** — desloga o usuário automaticamente e redireciona para `/login`
- **Outros erros** — dispara um `CustomEvent` global capturado pelo `ToastProvider`, exibindo o erro como toast para o usuário

---

## Decisões técnicas e limitações conhecidas

### Página de adicionar cartas

A página de adicionar cartas exibe apenas as cartas que o usuário ainda não possui,
filtrando no frontend as cartas já presentes na coleção do usuário. Para garantir
que sempre hajam cartas disponíveis para exibição, um efeito automático busca a
próxima página quando todas as cartas da página atual já pertencem ao usuário.

**Melhoria sugerida para a API:** Adicionar um parâmetro como `excludeMyCards=true`
no endpoint `GET /cards` para que o filtro seja feito server-side, eliminando a
necessidade de múltiplas requisições e tornando a experiência mais eficiente.

### Página de minhas trocas

Como não existe um endpoint `GET /me/trades`, as trocas do usuário são filtradas
no frontend por `userId` a partir das trocas já carregadas via infinite scroll.
Isso significa que trocas em páginas ainda não carregadas podem não aparecer até
que o usuário role a página.

**Melhoria sugerida para a API:** Criar um endpoint dedicado `GET /me/trades`
retornando apenas as trocas do usuário autenticado.

### Paginação de minhas cartas

O endpoint `GET /me/cards` retorna todas as cartas do usuário sem suporte a paginação.

**Melhoria sugerida para a API:** Adicionar suporte a `rpp` e `page` no endpoint `GET /me/cards`.

### Armazenamento do token

O token JWT é armazenado no `localStorage` por simplicidade. Em produção, o ideal seria utilizar `httpOnly cookies` via BFF (Backend for Frontend) para evitar ataques XSS.

---

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/luisdandolini/marketplace-inmeta.git
cd marketplace-inmeta

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com a URL da API

# Rode o projeto
yarn dev
```

### Variáveis de ambiente

```env
VITE_API_URL=https://cards-marketplace-api.onrender.com
```

---

## API

**Base URL:** `https://cards-marketplace-api.onrender.com`

| Método | Endpoint      | Descrição                        |
| ------ | ------------- | -------------------------------- |
| POST   | `/register`   | Registra um novo usuário         |
| POST   | `/login`      | Realiza login e retorna token    |
| GET    | `/me`         | Retorna dados do usuário logado  |
| GET    | `/cards`      | Lista todas as cartas (paginado) |
| POST   | `/me/cards`   | Adiciona cartas ao usuário       |
| GET    | `/me/cards`   | Lista cartas do usuário          |
| GET    | `/trades`     | Lista todas as trocas (paginado) |
| POST   | `/trades`     | Cria uma solicitação de troca    |
| DELETE | `/trades/:id` | Remove uma solicitação de troca  |
