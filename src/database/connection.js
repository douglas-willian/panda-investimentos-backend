const knex = require('knex');
const knexfile = require('../../knexfile');

const env = 'development'; // process.env.NODE_ENV ||
const config = knexfile[env];

const connection = knex(config);

module.exports = connection;
