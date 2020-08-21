const knex = require('knex');
const knexfile = require('../../knexfile');

const env = 'development';
const config = knexfile[env];

const connection = knex(config);

module.exports = connection;
