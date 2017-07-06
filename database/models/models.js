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
  }
});

module.exports = {
  User: User,
  Users: User.collection(User),
  Job: Job,
  Jobs: Job.collection(Job)
};
