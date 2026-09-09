# Backend do FlowFin

<div align="center">

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.0-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Security-JWT-6DB33F?style=flat-square&logo=springsecurity&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white)

</div>

Essa é a camada de API e regra de negócio do FlowFin. Aqui fica o coração do sistema: autenticação, validação, persistência de dados e lógica por trás de receitas, despesas, projetos e usuários. Em outras palavras, o backend é o responsável por garantir que tudo funcione de forma correta, segura e consistente.

## 🚀 Stack utilizada

- Java 17
- Spring Boot 4.1.0
- Spring Web MVC
- Spring Data JPA
- Spring Security
- PostgreSQL
- JWT (Auth0 Java JWT)
- Lombok
- Validation

## 🧠 Qual é o papel do backend?

O backend faz o trabalho pesado para a aplicação funcionar de verdade. Ele:

- autentica usuários
- valida entradas e regras de negócio
- persiste dados no banco
- expõe endpoints REST para o frontend
- protege rotas sensíveis com segurança
- retorna respostas em JSON para o cliente

Sem essa camada, o frontend até poderia mostrar uma interface bonita, mas não teria um sistema real para guardar e processar as informações.

## 🏗️ Estrutura principal

Dentro do projeto Spring, a organização segue um padrão bem comum e saudável:

- Controllers: recebem as requisições HTTP e definem os endpoints
- Services: concentram a lógica da aplicação
- Domain: contém as entidades do negócio
- Security: configura autenticação, filtros e permissões
- DTOs: transportam dados entre camadas de forma segura
- enums: representações fixas de status e categorias

Essa divisão é importante porque deixa o código mais limpo, organizado e fácil de evoluir.

## 🔄 Como o backend funciona na prática

### 1. Requisição do frontend

Quando o navegador ou app envia uma chamada, a requisição chega ao Spring MVC. O controller identifica a rota e decide qual serviço deve responder.

### 2. Lógica de negócio

A camada de serviço então verifica regras importantes, como:

- se o usuário existe
- se o token é válido
- se uma despesa ou receita pode ser criada
- se um projeto pertence ao usuário correto

### 3. Persistência com JPA

As entidades são mapeadas para tabelas do banco usando JPA. Isso permite que o backend se conecte ao PostgreSQL sem escrever SQL manualmente em cada operação.

### 4. Resposta para o cliente

Depois de processar a requisição, o backend responde em JSON com dados ou mensagens de erro. O frontend usa isso para renderizar a tela correta.

## 🔐 Segurança e autenticação

A segurança é um ponto central do projeto.

### Spring Security

A classe de configuração define quais endpoints são públicos e quais exigem autenticação.

### JWT

Depois do login, o backend gera um token JWT. Esse token é enviado em requisições futuras, e o sistema usa o filtro de segurança para validar o usuário antes de permitir o acesso.

Esse modelo é muito usado em APIs modernas porque deixa a autenticação leve e eficiente.

## 🧭 Fluxo de autenticação típico

1. O usuário envia email e senha.
2. O backend valida as credenciais.
3. Se tudo estiver certo, gera um JWT.
4. O frontend guarda o token.
5. Cada rota protegida manda esse token no cabeçalho.
6. O filtro verifica a validade do token.
7. O sistema autoriza ou bloqueia a ação.

## 📡 Endpoints esperados

O backend expõe rotas para:

- login
- cadastro de usuário
- consulta de usuário
- criação de receitas
- listagem de despesas
- gestão de projetos
- dashboard financeiro

Tudo isso em formato REST, com comunicação em JSON.

## 🔗 Relação com o frontend

O frontend não acessa o banco diretamente. Ele chama a API do backend e o backend responde com os dados necessários. Essa separação é essencial para manter o projeto organizado e seguro.

## ▶️ Como rodar

Entre na pasta do backend:

```bash
cd Backend/demo
```

E execute:

```bash
./mvnw spring-boot:run
```

Para Windows:

```bash
mvnw.cmd spring-boot:run
```

## ✅ Conclusão

O backend do FlowFin é a base de tudo. Ele cuida da autenticação, organiza a regra de negócio e mantém os dados persistidos de maneira segura. Sem essa estrutura, a aplicação não teria consistência nem confiabilidade. É a parte que garante que o sistema funcione como uma solução real, não apenas como uma interface bonita.
