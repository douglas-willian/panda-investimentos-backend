// Update with your config settings.

module.exports = {
  // development: {
  //   client: 'pg',
  //   connection: {
  //     filename: './src/database/db.sqlite',
  //   },
  //   migrations: {
  //     directory: './src/database/migrations',
  //   },
  //   useNullAsDefault: true,
  // },

  production: {
    client: 'pg',
    connection: {
      database: 'pandadatabase',
      user: 'postgres',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations',
    },
    useNullAsDefault: true,
  },
};
