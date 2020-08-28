// This should be in a DAO file
const knex = require('../knex/knex');

function factory(name, description, price) {
  return {
    name,
    description,
    price,
  };
}

// Simple insert statement
function insertOne(product) {
  return knex('products')
    .insert(product);
}

module.exports = {
  factory,
  insertOne,
};