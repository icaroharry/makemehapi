const Hapi = require('hapi');
const server = new Hapi.Server();
const fs = require('fs');
const Joi = require('joi');
const Boom = require('boom');
const Bcrypt = ('bcrypt');

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(require('hapi-auth-basic'), (err) => {
  if(err) throw err;
});

const validate = function (request, username, password, callback) {
    if(username === 'hapi' && password === 'auth') {
      callback('success');
    } else {
      callback(Boom.unauthorized('Bad username or password', 'username or password'))
    }
};

server.auth.strategy('simple', 'basic', { validateFunc: validate });

server.route({
  path: '/',
  method: 'GET',
  config: {
    auth: 'simple',
    handler: (request, reply) => {
      reply();
    }
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
