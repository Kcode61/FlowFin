# Frontend do FlowFin

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Data%20Viz-FF6384?style=flat-square&logo=chartdotjs&logoColor=white)

</div>

Esta parte do FlowFin é a cara do sistema: a interface que o usuário vê, interage e entende. Com Next.js, React e TypeScript, o frontend transforma os dados vindos da API em uma experiência clara, moderna e funcional para acompanhar finanças pessoais e de projetos.

## 🚀 Stack utilizada

- Next.js 16
- React 19
- TypeScript
- Recharts
- Lucide React
- CSS moderno

## 🎯 O que o frontend faz

O frontend é responsável por:

- renderizar as telas e componentes da aplicação
- capturar dados do usuário em formulários
- enviar requisições para o backend
- mostrar receitas, despesas e projetos de forma visual
- controlar login, cadastro e navegação
- apresentar indicadores financeiros em dashboard

Em resumo, ele é a ponte entre a lógica do sistema e a experiência do usuário.

## 🏗️ Estrutura principal

A organização segue a ideia do App Router do Next.js:

- app/: páginas da aplicação
- components/: blocos reutilizáveis
- services/: integração com a API
- types/: definições de tipos TypeScript
- utils/: funções auxiliares

Páginas importantes incluem:

- Login
- Register
- Dashboard
- Receitas
- Despesas
- Projetos
- Perfil

## 🔄 Como o frontend funciona

### 1. Roteamento

Cada rota fica em uma pasta dentro de app. Isso torna a organização simples: cada página tem seu próprio lugar e o componente fica bem identificado.

### 2. Componentização

A interface é montada com blocos menores e reutilizáveis, como:

- Header
- Footer
- Sidebar
- StatCard
- StatusPreviewBox
- CtaSection

Essa abordagem deixa a UI mais consistente e mais fácil de manter.

### 3. Comunicação com o backend

O frontend manda requisições HTTP para a API do backend. Em geral, ele busca ou envia informações como:

- login
- cadastro de usuário
- criação de receitas/despesas
- listagem de projetos
- dados para o dashboard

A API responde em JSON e a interface renderiza esse conteúdo na tela.

## 🔐 Fluxo de autenticação

Quando o usuário faz login:

1. ele preenche email e senha
2. a interface envia a solicitação para o backend
3. o backend valida as credenciais e retorna um token JWT
4. o frontend guarda esse token localmente
5. as próximas requisições usam esse token para acessar áreas protegidas

Esse fluxo ajuda a manter o sistema mais seguro e organizado.

## 📊 Visualização de dados

O frontend também cuida da parte visual da informação financeira. A biblioteca Recharts permite criar gráficos e indicadores que ajudam o usuário a entender melhor o comportamento do saldo, receitas e despesas.

Isso torna o dashboard muito mais útil e fácil de interpretar.

## ▶️ Como rodar

Entre na pasta do frontend:

```bash
cd Frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```

## ✅ Conclusão

O frontend do FlowFin é a parte que traduz a lógica do sistema em algo útil e amigável para o usuário. Com Next.js e React, a aplicação ganha produtividade, responsividade e uma interface moderna. O resultado é uma experiência muito mais agradável para quem quer controlar o financeiro de forma simples, clara e eficiente.
