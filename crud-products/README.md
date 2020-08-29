# CRUD products

## Authors
- Alfredo Quintero Tlacuilo

## Features

### REST API

#### Endpoints

- GET /products
- GET /products/:id
- POST /products
- PUT /products/:id
- DELETE /products/:id
- React App

### React APP

#### Features

- List ALL products
- Create products
- Update products
- Delete products

## Schema

### Product

#### Fields

  - name: String
  - description: String
  - price: Float

## Install

### HTTP server

1. Modify your environment variables. Example at ./server/.env.example
2. Make sure you have MySQL installed
3. **IMPORTANT** If you are going to run the knex migrations please note that you have to specify the knex file with the flag ```--knexfile```
4. Run npm i
5. Run npm start

### React app

1. Go to ./react-app directory
2. Run npm i
3. Run npm start
