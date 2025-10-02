# Fakend API

Este projeto foi desenvolvido como **treinamento**, com o objetivo de praticar
a criação de uma API utilizando **TypeORM, Express e MySQL**.

A ideia inicial era disponibilizar a API de forma **pública**, mas percebi
que manter um banco de dados online demandaria custos que não valem a pena
para o propósito atual.

Por esse motivo, este projeto não será mais mantido.  
Ele fica arquivado como **referência de estudo** e documentação do meu
aprendizado.

O próximo passo será a criação de um **novo projeto do zero**, com uma
lógica diferente e sem a dependência de banco de dados para rodar em
produção.

Atualmente, a API roda apenas em **localhost**, mas o código está disponível
de forma **pública no GitHub**.

Ela foi desenvolvida com **TypeORM, Express e MySQL** e implementa um
**CRUD básico de login e alguns elementos**.  
O projeto já inclui o arquivo **dump do banco de dados**, permitindo que você
crie facilmente a base em sua máquina local.


## API — Login

API de exemplo focada em **autenticação de usuários** com **JWT**.  
Criada para **treino e prototipagem rápida**.

---

## 📌 Endpoint

### Login
```
POST http://localhost:3000/api/v1/auth/login
```

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta de sucesso:**
```json
{
  "status": "success",
  "message": "Login efetuado com sucesso",
  "data": "<token JWT>"
}
```

**Erros possíveis:**
```json
{
  "status": "error",
  "statusCode": 401,
  "message": "E-mail or password wrong"
}
```

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Missing email or password"
}
```

---

## 🔐 Uso do Token

Nas rotas protegidas:
```
Authorization: Bearer <token JWT>
```

---

## 📂 Dados para teste

O projeto inclui **200 usuários pré-setados** em  
`usersReference.json` (com email e senha).  
