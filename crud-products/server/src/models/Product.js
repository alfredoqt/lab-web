// This should be in a DAO file
const knex = require('../knex/knex');

function factory(name, description, price) {
  return {
    name,
    description,
    price: Number.parseFloat(price),
  };
}

// Simple insert statement
function insertOne(product) {
  return knex('products')
    .insert(product);
}

function getOne(id) {
  return knex('products')
    .where({ id: Number.parseFloat(id) })
    .select('*');
}

function getAll(id) {
  return knex('products')
    .select('*');
}

function updateOne(id, product) {
  return knex('products')
    .where({ id: Number.parseFloat(id) })
    .update(product);
}

function deleteOne(id) {
  return knex('products')
    .where({ id: Number.parseFloat(id) })
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
