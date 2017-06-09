const Hapi = require('hapi');
const server = new Hapi.Server();
const fs = require('fs');
const Joi = require('joi');

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/chickens/{breed}',
  method: 'GET',
  handler: (request, reply) => {},
  config: {
    validate: {
      params: {
        breed: Joi.string().required()
      }
    }
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
