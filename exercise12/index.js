const Hapi = require('hapi');
const server = new Hapi.Server();
const fs = require('fs');
const Joi = require('joi');
const Boom = require('boom');

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/set-cookie',
  method: 'GET',
  handler: (request, reply) => {
    reply('success').state('session', { key: 'makemehapi' })
  },
  config: {
    state: {
      parse: true,
      failAction: 'log'
    }
  }
});

server.route({
  path: '/check-cookie',
  method: 'GET',
  handler: (request, reply) => {
    let session = request.state.session;
    let response;
    !session ? response = { user: 'hapi' } : response = Boom.badRequest('Invalid cookie value');
    reply(response);
  },
  config: {
    state: {
      parse: true,
      failAction: 'log'
    }
  }
});

server.state('session', {
  encoding: 'base64json',
  ttl: 10,
  domain: 'localhost',
  path: '/',
  isSecure: false,
  isHttpOnly: false,
  isSameSite: false
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
