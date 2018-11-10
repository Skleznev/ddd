# QBaseServer

API Server for QBase

## How to start?

- `$ yarn install`
- Create DB via code from [db](db) directory
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

```bash
DEBUG=qbaseserver (optional)
PORT=8080
DATABASE_URL=postgresql://postgres@localhost:5432/postgres
DATABASE_MAX=20 # Maximum connection for DB for instance
DATABASE_SSL=true (do not set for unsecured connection)
EXPRESS_BODY_PARSER_LIMIT_JSON=1TB
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

## POST `/algorithm` - create new algorithm

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
  "description": "Description",
  "id": "1",
  "name": "Matrix"
}
```

## GET `/algorithm/:id` - get algorithm

Response body (example)

```json
{
  "description": "Description",
  "id": "1",
  "name": "Matrix"
}
```

## DELETE `/algorithm/:id` - delete algorithm

## PUT `/algorithm/:id` - update algorithm

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
  "description": "Description",
  "id": "1",
  "name": "Matrix"
}
```

## POST `/algorithm/:id/determinant` - create determinant for algorithm

Request body (example)

```json
{
  "dimensions": [4, 7],
  "expression": {}
}
```

Response body (example)

```json
{
  "id": "1",
  "algorithm": "1",
  "dimensions": [4, 7],
  "expression": {},
  "processors": 4,
  "ticks": 7
}
```

## GET `/algorithm/:id/determinants` - get all determinants for algorithm

Response body (example)

```json
[
  {
    "id": "1",
    "algorithm": "1",
    "dimensions": [4, 7],
    "expression": {},
    "processors": 4,
    "ticks": 7
  }
]
```

## POST `/algorithms/compare` - compare two algorithms

Request body (example)

```json
{
  "id1": "1",
  "id2": "2"
}
```

Response body (example)

```json
{
  "processors": 0,
  "ticks": -1
}
```

## GET `/determinant/:id` - get determinant

Response body (example)

```json
{
  "id": "1",
  "algorithm": "1",
  "dimensions": [4, 7],
  "expression": {},
  "processors": 4,
  "ticks": 7
}
```

## DELETE `/determinant/:id` - delete determinant
