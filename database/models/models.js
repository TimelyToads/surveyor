const bookshelf = require('../bookshelf.js');

const User = bookshelf.Model.extend({
  tableName: 'users',
  jobs: function() {
    return this.hasMany(Job);
  }
});

const Job = bookshelf.Model.extend({
  tableName: 'jobs',
  user: function() {
    return this.belongsTo(User);
  },
  actions: function() {
    return this.hasMany(Action);
  }
});

const Action = bookshelf.Model.extend({
  tableName: 'actions',
  job: function() {
    return this.belongsTo(Job);
  }
});

module.exports = {
  User: User,
  Users: User.collection(User),
  Job: Job,
  Jobs: Job.collection(Job),
  Action: Action,
  Actions: Action.collection(Action)
};
