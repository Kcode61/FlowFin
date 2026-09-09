# FlowFin

<div align="center">

![FlowFin](https://img.shields.io/badge/FlowFin-Finance%20Manager-0A0F1E?style=for-the-badge&logo=money&logoColor=white)

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.0-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

</div>

FlowFin é uma aplicação de gestão financeira pensada para ajudar pessoas e times a acompanhar receitas, despesas, projetos e desempenho financeiro de forma simples, clara e segura. A ideia central é unir uma API robusta no backend com uma interface moderna no frontend, criando uma experiência que seja funcional e agradável de usar.

## 📌 Sobre o projeto

O sistema foi pensado como uma solução full stack em duas camadas:

- Backend em Java com Spring Boot: responsável por autenticação, regras de negócio, acesso ao banco e exposição dos endpoints da API.
- Frontend em Next.js + React: responsável por renderizar a interface, capturar ações do usuário e consumir os dados da API.

Em vez de misturar tudo em um único app, o projeto separa responsabilidades. Isso deixa o desenvolvimento mais organizado, facilita manutenção, melhora a segurança e torna a aplicação mais fácil de evoluir conforme cresce.

## 🧩 Stack principal

### Backend

- Java 17
- Spring Boot 4.1.0
- Spring Web MVC
- Spring Data JPA
- Spring Security
- PostgreSQL
- JWT para autenticação
- Lombok
- Bean Validation

### Frontend

- Next.js 16
- React 19
- TypeScript
- Recharts
- Lucide React
- CSS moderno para UI

## 🛠️ Como ele funciona

### Fluxo de uso

1. O usuário acessa a interface web.
2. Ele realiza login ou cadastro.
3. O frontend envia as credenciais para a API do backend.
4. O backend valida a informação, gera um token JWT e devolve a resposta.
5. Com o token em mãos, o frontend faz chamadas para rotas protegidas.
6. O backend consulta ou grava os dados no PostgreSQL.
7. A interface atualiza a tela com os dados financeiros.

### Arquitetura em camadas

O principal diferencial do projeto é a separação clara entre:

- Backend: regra de negócio, autenticação, persistência e API REST
- Frontend: interface visual, navegação e consumo de dados

Isso torna a aplicação mais previsível e profissional. O usuário vê uma experiência fluida, mas por trás disso há uma estrutura organizada e segura.

## 🧠 O que a aplicação oferece

O FlowFin foi pensado para controlar pontos fundamentais do uso financeiro pessoal e de projetos, como:

- cadastro e autenticação de usuários
- controle de receitas e despesas
- acompanhamento de projetos
- painel financeiro com visão geral
- perfil do usuário
- organização dos dados em um banco relacional

## 📁 Estrutura do repositório

- Backend: API em Java e Spring Boot
- Frontend: aplicação web em Next.js
- README principal: visão geral do sistema e arquitetura

## 🚀 Como rodar localmente

### Backend

Entre na pasta do backend e execute:

```bash
cd Backend/demo
./mvnw spring-boot:run
```

### Frontend

Entre na pasta do frontend e rode:

```bash
cd Frontend
npm install
npm run dev
```

Depois, abra no navegador:

```text
http://localhost:3000
```

## 📈 Fluxo de desenvolvimento

O ciclo de desenvolvimento costuma seguir esta lógica:

1. definir a regra de negócio no backend
2. criar ou ajustar endpoints da API
3. validar a autenticação e persistência
4. consumir esses dados no frontend
5. montar as telas e interações do usuário
6. testar a integração entre as duas partes

## 🎯 Objetivo do projeto

FlowFin é mais do que um app financeiro simples: é uma demonstração prática de como construir uma aplicação full stack com boa arquitetura, padronização e foco na experiência do usuário. A combinação entre Java, Spring Boot, Next.js e React mostra um fluxo profissional de desenvolvimento, com segurança, organização e uma base sólida para evoluir.

Se você chegou até aqui, já tem uma boa visão de como o projeto funciona por dentro. E o melhor é que essa estrutura facilita muito a continuidade do desenvolvimento, testes e novas funcionalidades.
