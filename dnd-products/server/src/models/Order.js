const knex = require("../knex/knex");

const STATUS = {
  SALIDA_DE_PLANTA: "SALIDA_DE_PLANTA",
  LDC: "LDC",
  PROCESO_ENTREGA: "PROCESO_ENTREGA",
  COMPLETADO: "COMPLETADO",
  FALLIDO: "FALLIDO",
};

function getAll() {
  return knex.select("*").from("orders");
}

function insertOne(name) {
  return knex("orders").insert({ name });
}

function getOne(id) {
  return knex
    .select("*")
    .from("orders")
    .where("id", Number.parseInt(id, 10))
    .first();
}

function updateOne(id, order) {
  return knex("orders")
    .where({ id: Number.parseInt(id, 10) })
    .update(order);
}

module.exports = {
  getAll,
  insertOne,
  STATUS,
  getOne,
  updateOne,
};
