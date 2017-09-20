// Update with your config settings.

module.exports = {
  development: {
    debug: true,
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'idea_hunt_development',
      trace: false
    },
    seeds: {
      directory: './src/seeds'
    },
    migrations: {
      directory: './src/migrations'
    }
  },

  test: {
    debug: false,
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'idea_hunt_test',
      trace: false
    },
    seeds: {
      directory: './seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/migrations'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'idea_hunt_production',
      trace: false
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/migrations'
    }
  }

};
