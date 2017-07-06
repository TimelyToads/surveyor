exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('googleid');
      table.string('username').unique();
      table.string('password');
      table.string('name');
      table.string('email').unique();
    }),

    knex.schema.createTable('jobs', function(table) {
      table.increments('id').primary();
      table.integer('user_id')
        .references('id')
        .inTable('users');
      table.dateTime('date');
      table.string('jobtitle');
      table.string('company');
      table.string('city');
      table.string('state');
      table.string('country');
      table.string('language');
      table.string('source');
      table.string('snippet');
      table.string('url');
      table.string('onmousedown');
      table.string('jobkey');
      table.boolean('sponsored');
      table.boolean('expired');
      table.boolean('indeedApply');
      table.string('formattedLocation');
      table.string('formattedLocationFull');
      table.string('formattedRelativeTime');
      table.string('stations');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('jobs'),
    knex.schema.dropTable('users')
  ]);
};

