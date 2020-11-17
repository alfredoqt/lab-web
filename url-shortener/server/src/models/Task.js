const knex = require("../knex/knex");

const PENDING = "pending";

function getAll() {
  return knex.select("*").from("tasks");
}

function insertOne(task) {
  return knex("tasks").insert({ description: task.description });
}

function getOne(id) {
  return knex
    .select("*")
    .from("tasks")
    .where("id", Number.parseInt(id, 10))
    .first();
}

function updateOne(id, task) {
  return knex("tasks")
    .where({ id: Number.parseInt(id, 10) })
    .update(task);
}

function deleteOne(id) {
  return knex("tasks")
    .where({ id: Number.parseInt(id, 10) })
    .del();
}

module.exports = {
  getAll,
  insertOne,
  getOne,
  updateOne,
  deleteOne,
  PENDING,
};
