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

function getOne(id) {
  return knex('products')
    .where({ id: Number.parseInt(id, 10) })
    .select('*');
}

function getAll(id) {
  return knex('products')
    .select('*');
}

function updateOne(id, product) {
  return knex('products')
    .where({ id: Number.parseInt(id, 10) })
    .update(product);
}

function deleteOne(id) {
  return knex('products')
    .where({ id: Number.parseInt(id, 10) })
    .del();
}

module.exports = {
  factory,
  insertOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
};
