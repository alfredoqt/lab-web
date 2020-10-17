const Order = require("../../models/Order");

exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.string("name", 512).notNullable();
    table
      .string("current_status", 512)
      .notNullable()
      .defaultTo(Order.STATUS.SALIDA_DE_PLANTA);
    table.string("previous_status", 512).nullable();
    table.timestamp("changed_status_at").nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orders");
};
