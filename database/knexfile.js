// Update with your config settings.

module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: 'localhost',
      database: 'surveyorDB',
      user:     'dbuser',
      password: 'password'
    }
};
