# QBaseServer

API Server for QBase

## How to start?

- `$ yarn install`
- Apply all DB migrations from [db](db) directory
- Set **Env variables**
- `$ yarn start`

## Requirements

- OS: Any supported Node.js (but GNU/Linux better :)
- Node.js: 9.6.1
- yarn: 1.3.2
- PostgreSQL: 10.2
- Cluster Mode: supported via `pm2`
- Heroku support + scaling horizontally: yes, why not?

## Env variables

```dotenv
DEBUG=qbaseserver # optional
PORT=8080
DATABASE_URL=postgresql://postgres@localhost:5432/postgres
DATABASE_MAX=20 # maximum connection for DB for instance
DATABASE_SSL=true # do not set for unsecured connection
EXPRESS_BODY_PARSER_LIMIT_JSON=1TB
JWT_SECRET=secret
USER*=user:password
```

## GET `/algorithms` - get all algorithms

Response body (example)

```json
[
  {
    "description": "Description",
    "id": "1",
    "name": "Matrix"
  }
]
```

## POST `/algorithms` - create new algorithm

> REQUIRED AUTH!

Request body (example)

```json
{
  "description": "Description",
  "name": "Matrix"
}
```

Response body (example)

```json
{
  "id": "1"
}
```

## GET `/algorithms/compare/:id1-:id2` - compare two algorithms

Response body (example)

```json
{
  "processors": 0,
  "ticks": -1
}
```

## DELETE `/algorithms/:id` - delete algorithm

> REQUIRED AUTH!

## GET `/algorithms/:id` - get algorithm

Response body (example)

```json
{
  "description": "Description",
  "id": "1",
  "name": "Matrix"
}
```

## PUT `/algorithms/:id` - update algorithm

> REQUIRED AUTH!

Request body (example)

```json
{
  "description": "Description",
  "name": "Matrix"
}
```

## GET `/algorithms/:id/determinants` - get all determinants for algorithm

Response body (example)

```json
[
  {
    "algorithm": "1",
    "dimensions": [4, 7],
    "expression": {},
    "id": "1",
    "iterations": 69,
    "processors": 4,
    "ticks": 7
  }
]
```

## POST `/algorithms/:id/determinants` - create determinant for algorithm

> REQUIRED AUTH!

Request body (example)

```json
{
  "dimensions": [4, 7],
  "expression": {},
  "iterations": 69
}
```

Response body (example)

```json
{
  "id": "1"
}
```

## DELETE `/algorithms/:id/determinants/:id` - delete determinant from algorithm

> REQUIRED AUTH!

## GET `/algorithms/:id/determinants/:id` - get determinant from algorithm

Response body (example)

```json
{
  "algorithm": "1",
  "dimensions": [4, 7],
  "expression": {},
  "id": "1",
  "iterations": 69,
  "processors": 4,
  "ticks": 7
}
```

## PATCH `/algorithms/:id/determinants/:id` - patch determinant

> REQUIRED AUTH!

Request body (example)

```json
{
  "iterations": 69
}
```

## POST /signin

Request body (example)

```json
{
  "user": "user",
  "password": "password"
}
```

Response body (example)

```json
{
  "token": "bearer auth token"
}
```

# GET /whoami

> REQUIRED AUTH!

Response body (example)

```json
{
  "user": "user"
}
```
