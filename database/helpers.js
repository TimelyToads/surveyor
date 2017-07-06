const models = require('./models/models.js');

const getUser = (username) => {
  return models.User.forge({username}).fetch()
    .then( (user) => {
      if (user) {
        console.log('\tSUCCESS');
        return user.toJSON();
      } else {
        const message = 'User not found';
        const status = 404;
        console.log('\t', message)
        throw {message, status};
      }
    });
}

exports.getUser = getUser;