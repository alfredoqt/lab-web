# URL Shortener

## Authors

- Alfredo Quintero Tlacuilo

## Install

### HTTP server

1. Modify your environment variables. Example at ./server/.env.example
2. Make sure you have MySQL installed
3. cd ./server
4. Run npm i
5. Run knex migrations **IMPORTANT** If you are going to run the knex migrations please note that you have to specify the knex file with the flag `--knexfile`. Example `npm run knex migrate:latest -- --knexfile ./src/knexfile.js`
6. Run npm start
