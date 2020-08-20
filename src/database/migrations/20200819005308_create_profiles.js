// const Knex = require('knex');

exports.up = function (knex) {
  return knex.schema.createTable('profiles', (table) => {
    table.string('id').primary();
    table.string('email').notNullable();
    table.string('encryptedPassword').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('profiles');
};
