# Fakend API

Este projeto foi desenvolvido como parte do meu **treinamento prático** em **TypeORM, Express e MySQL**, com foco na criação de uma API estruturada e documentada.

A ideia inicial era disponibilizar a API de forma **pública**, mas manter um banco de dados online exigiria custos de hospedagem que não fazem sentido para o propósito atual.  
Por esse motivo, o projeto **não está mais em produção** e fica arquivado como **referência de estudo e documentação** do meu aprendizado.

Atualmente, a API roda apenas em **localhost**, mas o código está disponível de forma **pública no GitHub**, permitindo que qualquer pessoa utilize como base de estudo.

## Recursos incluídos no projeto

- 📦 **Dump do banco de dados MySQL** – para recriar facilmente a base local.  
- ⚙️ **Funções de geração dinâmica de dados** – que utilizam fontes externas para popular alguns endpoints com informações realistas.  
- 📄 **Arquivos JSON simulados** – contendo dados de exemplo prontos para todos os endpoints, facilitando testes rápidos sem necessidade de rodar a API.  

---

# Fakend API — Login

A rota **Login** serve para **autenticar usuários que já existem** na API.

Ao fazer login, você recebe um **token JWT** que pode usar para acessar outras rotas protegidas.

📌 Importante: a API já vem com **200 usuários pré-setados** disponíveis para testes.

Você pode consultar esse arquivo de usuários em:

[usersReference.json](./usersReference.json)

*(contém email e senha para testes — perfeito para protótipos rápidos)*

---

## 📌 Endpoint

```
POST https://fakend.com.br/api/v1/auth/login
```

---

## 🛠 Como funciona

1. Você envia **email** e **senha** no corpo da requisição (**body**).
2. Se tudo estiver correto → recebe um **token JWT**.
3. Se houver erro → recebe mensagem explicando o erro.

---

### Entrada esperada (body JSON)

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

---

## 📤 Respostas possíveis

### ✅ Sucesso

```json
{
  "status": "success",
  "message": "Login efetuado com sucesso",
  "data": "<token JWT>"
}
```

- `data` é o **token JWT** que você usa em outras requisições.

---

### ⚠️ Erro — credenciais inválidas

```json
{
  "status": "error",
  "statusCode": 401,
  "message": "E-mail or password wrong"
}
```

---

### ⚠️ Erro — campos faltando

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Missing email or password"
}
```

---

## 💻 Exemplo prático

### JavaScript (fetch)

```jsx
fetch("https://fakend.com.br/api/v1/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "Ian_Block54@hotmail.com",
    password: "ZPdtAqhe"
  })
})
.then(res => res.json())
.then(res => {
  if (res.status === "success") {
    console.log("Login feito com sucesso!");
    console.log("Token JWT:", res.data);
    localStorage.setItem("jwt", res.data);
  } else {
    console.error("Erro:", res.message);
  }
});
```

---

## 🔐 Como usar o token JWT

Depois de fazer login e receber o token, você pode usar ele no **header** de outras requisições para acessar páginas e rotas protegidas.

**Exemplo de header:**

```
Authorization: Bearer <token JWT>
```

---

# Fakend API — Register

A rota **Register** serve para **criar novos usuários** no banco de dados da Fakend API.

⚠️ Atualmente, cada IP pode fazer até **3 requisições** para essa rota por dia, para evitar sobrecarga no sistema.

---

## 📌 Endpoint

```
POST https://fakend.com.br/api/v1/auth/register
```

---

## 🛠 Como funciona

1. Você envia os dados do usuário no corpo da requisição (**body**).
2. O sistema valida os dados conforme as regras abaixo.
3. Se tudo estiver correto → usuário é criado e recebe mensagem de sucesso.
4. Se houver erro → recebe mensagem explicando o problema.

---

### 📥 Entrada esperada (body JSON)

```json
{
  "name": "will",
  "last_name": "smith",
  "birth_date": "1979-12-09",
  "sexo": "M",
  "email": "calabreso@gmail.com",
  "password": "@78#71"
}
```

---

### 📋 Campos obrigatórios e regras de validação

| Campo | Tipo | Regras |
| --- | --- | --- |
| name | string | mínimo 2 caracteres |
| last_name | string | mínimo 2 caracteres |
| birth_date | string | formato `YYYY-MM-DD` |
| sexo | string | `"M"` ou `"F"` |
| email | string | email válido, único no banco |
| password | string | mínimo 6 caracteres |

💡 É recomendável fazer **validações no front-end** para evitar enviar dados inválidos para o backend e reduzir erros.

---

## 📤 Respostas possíveis

### ✅ Sucesso

```json
{
  "status": "success",
  "message": "User created with success!",
  "data": null
}
```

---

### ⚠️ Erros detalhados

#### 1 — Campos inválidos ou incompletos

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "The last name field must have at least 2 characters,The name field must have at least 2 characters,The email field must be a valid email,The password field must have at least 6 characters,The gender field must be 'M' or 'F'"
}
```

#### 2 — Email já existente

```json
{
  "status": "error",
  "statusCode": 401,
  "message": "Email already in database"
}
```

#### 3 — Campos obrigatórios faltando

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "The email field is required,The password field is required"
}
```

#### 4 — Limite de requisições atingido

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Limit of users created by this IP reached"
}
```

---

## 💻 Exemplo prático

### JavaScript (fetch)

```jsx
fetch("https://fakend.com.br/api/v1/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "will",
    last_name: "smith",
    birth_date: "1979-12-09",
    sexo: "M",
    email: "calabreso@gmail.com",
    password: "@78#71"
  })
})
.then(res => res.json())
.then(res => {
  if (res.status === "success") {
    console.log("Usuário criado com sucesso!");
  } else {
    console.error("Erro:", res.message);
  }
});
```

---

# Rotas autenticadas

Todas as rotas abaixo **exigem autenticação via JWT** gerado no login.

O token deve ser enviado no **header** da requisição:

```
Authorization: Bearer <SEU_TOKEN_JWT>
```

Se o token estiver ausente ou inválido → retorna erro.

---

## 1️⃣ `/user/me` — Obter dados do usuário logado

### 📌 Endpoint

```
GET https://fakend.com.br/api/v1/user/me
```

### ✅ Sucesso

```json
{
  "status": "success",
  "message": "User data fetched successfully",
  "data": {
    "id": 12,
    "name": "Ian",
    "last_name": "Block",
    "birth_date": "1961-10-26",
    "sexo": "M",
    "email": "Ian_Block54@hotmail.com",
    "active": true,
    "is_fake": true,
    "expires_at": null,
    "ip_address": null,
    "created_at": "2025-09-11T14:27:24.768Z",
    "updated_at": "2025-09-11T14:27:24.806Z"
  }
}
```

### ❌ Token inválido

```json
{
  "status": "error",
  "message": "Invalid or missing token"
}
```

---

## 2️⃣ `/user/delete` — Deletar usuário logado

### 📌 Endpoint

```
DELETE https://fakend.com.br/api/v1/user/delete
```

### ⚠️ Apenas usuários criados via Register podem ser deletados

✅ Sucesso:

```json
{
  "status": "success",
  "message": "User deleted successfully",
  "data": null
}
```

❌ Conta pré-setada:

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "This account can’t be deleted"
}
```

---

## 3️⃣ `/user/edit/password` — Alterar senha

### 📌 Endpoint

```
PATCH https://fakend.com.br/api/v1/user/edit/password
```

### 🔑 Body esperado

```json
{
  "currentPassword": "senha_atual",
  "newPassword": "nova_senha",
  "confirmPassword": "nova_senha"
}
```

### ⚠️ Regras

- Usuários pré-setados não podem alterar senha.
- Senha mínima: 6 caracteres.
- `newPassword` ≠ senha atual.
- `newPassword` = `confirmPassword`.

---

## 4️⃣ `/user/edit` — Alterar dados do usuário

### 📌 Endpoint

```
PATCH https://fakend.com.br/api/v1/user/edit
```

### 🔑 Body esperado

```json
{
  "name": "Gabriel",
  "last_name": "Silva",
  "birth_date": "2000-05-15",
  "sexo": "M"
}
```

### ⚠️ Possíveis erros

- Campos inválidos.
- Conta pré-setada não pode ser editada.

---

## 📌 Resumo dos Métodos

| Endpoint | Método | Descrição |
| --- | --- | --- |
| `/auth/login` | POST | Login com email e senha |
| `/auth/register` | POST | Registro de novo usuário |
| `/user/me` | GET | Retorna dados do usuário logado |
| `/user/delete` | DELETE | Deleta usuário logado |
| `/user/edit/password` | PATCH | Altera senha |
| `/user/edit` | PATCH | Edita dados do usuário |

# Fakend API – Public Endpoints

**Base URL:**

```
https://fakend.com.br/api/v1
```

Todos os endpoints retornam respostas em **JSON**.

---

# API – Products

As rotas de produtos trabalham com **query parameters**, permitindo filtros dinâmicos e paginação.

## 1. Listar Produtos

**Endpoint:**

```
GET /products
```

**Descrição:**

Retorna uma lista de produtos com limite padrão de **100 itens**.

A API **não permite** retornar todos os produtos de uma vez, exceto quando definido `page=1` e `limit=1000`.

**Parâmetros de Query:**

- `page` *(opcional, number)* → número da página
- `limit` *(opcional, number)* → quantidade de itens por página (máx. 1000)

**Exemplo de uso:**

```
GET /products?page=2&limit=10
```

---

## 2. Produtos por Estoque

**Endpoint:**

```
GET /products/stock
```

**Descrição:**

Retorna os produtos com estoque maior que o valor mínimo definido.

O parâmetro `min` é **obrigatório**.

**Parâmetros de Query:**

- `min` *(obrigatório, number)* → estoque mínimo

**Exemplo de uso:**

```
GET /products/stock?min=400
```

---

## 3. Filtrar Produtos

**Endpoint:**

```
GET /products/filter
```

**Descrição:**

Permite filtrar produtos de forma dinâmica:

- apenas pelo preço mínimo (`min`),
- apenas pelo preço máximo (`max`),
- apenas pela categoria (`category`),
- ou pela combinação dos três.

**Parâmetros de Query:**

- `min` *(opcional, number)* → preço mínimo
- `max` *(opcional, number)* → preço máximo
- `category` *(opcional, string)* → categoria válida

**Exemplo de uso (completo):**

```
GET /products/filter?min=200&max=400&category=Furniture
```

---

## 4. Listar Categorias

**Endpoint:**

```
GET /products/options
```

**Descrição:**

Retorna todas as **categorias disponíveis** na base de dados.

---

## 📑 Tabela – Endpoints da API Products

| Método | Endpoint | Descrição | Parâmetros principais |
| --- | --- | --- | --- |
| GET | `/products` | Lista de produtos (com paginação) | `page`, `limit` |
| GET | `/products/stock` | Produtos por estoque mínimo | `min` |
| GET | `/products/filter` | Filtra produtos por preço/categoria | `min`, `max`, `category` |
| GET | `/products/options` | Retorna categorias disponíveis | — |

---

# API – Person

As rotas de pessoas permitem filtros dinâmicos e paginação.

## 1. Listar Pessoas

**Endpoint:**

```
GET /person
```

**Descrição:**

Retorna uma lista de pessoas, com limite padrão de **100 registros**.

**Parâmetros de Query:**

- `page` *(opcional, number)* → número da página.
- `limit` *(opcional, number)* → quantidade de registros por página (máx. 1000).

---

## 2. Filtrar Pessoas

**Endpoint:**

```
GET /person/filter
```

**Descrição:**

Permite filtrar pessoas de forma dinâmica, podendo combinar diversos filtros.

**Parâmetros de Query:**

- `name`
- `age`
- `gender` *(male, female, other)*
- `maritalStatus` *(single, married, divorced, widowed, other)*
- `city`, `state`, `country`

---

## 3. Listar Opções

**Endpoint:**

```
GET /person/options
```

**Descrição:**

Retorna as **opções disponíveis** no banco de dados, como nomes, cidades, estados, países, gênero e estado civil.

---

## 📑 Tabela – Endpoints da API Person

| Método | Endpoint | Descrição | Parâmetros principais |
| --- | --- | --- | --- |
| GET | `/person` | Lista pessoas (com paginação) | `page`, `limit` |
| GET | `/person/filter` | Filtra pessoas | `name`, `age`, `gender`, `maritalStatus`, `city`, `state`, `country` |
| GET | `/person/options` | Retorna opções disponíveis | — |

---

# API – Galery

O endpoint de galeria possui **mais de 1200 imagens** em diferentes categorias para **testar, filtrar e treinar aplicações**.

## 1. Listar Galeria

**Endpoint:**

```
GET /galery
```

**Descrição:**

Retorna uma lista paginada de imagens da galeria.

**Parâmetros de Query:**

- `page` *(opcional, number)* → número da página.
- `limit` *(opcional, number)* → quantidade de imagens por página (máx. 1000).

---

## 2. Filtrar Galeria

**Endpoint:**

```
GET /galery/filter
```

**Descrição:**

Permite filtrar imagens dinamicamente:

- apenas por `category`,
- apenas por `subcategory`,
- ou pela combinação dos dois.

**Parâmetros de Query:**

- `category` *(opcional, string)* → nome ou parte do nome da categoria.
- `subcategory` *(opcional, string)* → nome ou parte do nome da subcategoria.

---

## 3. Listar Opções da Galeria

**Endpoint:**

```
GET /galery/options
```

**Descrição:**

Retorna todas as **categorias e subcategorias disponíveis** no banco de imagens.

---

## 📑 Tabela – Endpoints da API Galery

| Método | Endpoint | Descrição | Parâmetros principais |
| --- | --- | --- | --- |
| GET | `/galery` | Lista imagens da galeria (com paginação) | `page`, `limit` |
| GET | `/galery/filter` | Filtra imagens por categoria/subcategoria | `category`, `subcategory` |
| GET | `/galery/options` | Retorna categorias e subcategorias | — |
