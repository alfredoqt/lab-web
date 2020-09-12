const bcrypt = require("bcryptjs");
const knex = require("../knex/knex");

/**
 * Encuentra al usuario que tenga el correo indicado
 */
function findById(id) {
  return knex.select("*").from("users").where("id", id).first();
}

/**
 * Encuentra al usuario que tenga el correo indicado
 */
function findByEmail(email) {
  return knex.select("*").from("users").where("email", email).first();
}

function create(user) {
  let pass = user.password;
  pass = bcrypt.hashSync(pass, 10);
  return knex("users").insert({
    name: user.name,
    email: user.email,
    password: pass,
    role: user.role || "user",
  });
}

function getAll() {
  // Exclude password
  return knex("users").select("id", "name", "email", "role");
}

module.exports = {
  findById,
  findByEmail,
  create,
  getAll,
};
