exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username').unique();
      table.string('first_name');
      table.string('last_name');
      table.string('img_url');
      table.string('email').unique();
    }),

    knex.schema.createTable('jobs', function(table) {
      table.increments('id').primary();
      table.string('username')
        .references('username')
        .inTable('users');
      table.dateTime('dateApplied');
      table.string('postingDate');
      table.dateTime('date');
      table.string('title');
      table.string('company');
      table.string('city');
      table.string('state');
      table.string('jobSourceWebsite');
      table.string('description');
      table.string('url', 1024);
      table.string('formattedLocation');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('jobs'),
    knex.schema.dropTable('users')
  ]);
};

