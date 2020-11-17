exports.up = function (knex) {
  return knex.schema.createTable("urls", (table) => {
    table.increments("id");
    table.string("longUrl", 512).notNullable();
    table.string("shortUrl", 512).notNullable();
    table.bigInteger("redirectCount").notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("urls");
};
