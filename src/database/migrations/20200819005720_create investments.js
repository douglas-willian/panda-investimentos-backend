// const Knex = require('knex');

exports.up = function up(knex) {
  return knex.schema.createTable('investments', (table) => {
    table.increments();

    table.string('type').notNullable();
    table.date('date', { useTz: false }).defaultTo(knex.fn.now());
    table.decimal('value').notNullable();
    table.string('userId').notNullable();

    table.foreign('userId').references('id').inTable('profiles');
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('investments');
};
