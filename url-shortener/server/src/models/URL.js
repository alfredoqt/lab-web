const knex = require("../knex/knex");

function insertOne(url) {
  return knex("urls").insert({
    longUrl: url.longUrl,
    shortUrl: url.shortUrl,
  });
}

function getOneWithShortUrl(shortUrl) {
  return knex.select("*").from("urls").where("shortUrl", shortUrl).first();
}

function updateShortenedCount(id, count) {
  return knex("urls")
    .where("id", Number.parseInt(id, 10))
    .update({ redirectCount: count });
}

function getOne(id) {
  return knex
    .select("*")
    .from("urls")
    .where("id", Number.parseInt(id, 10))
    .first();
}

module.exports = {
  insertOne,
  getOne,
  getOneWithShortUrl,
  updateShortenedCount,
};
