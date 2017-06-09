const Hapi = require('hapi');
const server = new Hapi.Server();
const fs = require('fs');
const Joi = require('joi');

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/login',
  method: 'POST',
  handler: (request, reply) => {
    reply('login successful');
  },
  config: {
    validate: {
      payload: Joi.object({
          isGuest: Joi.boolean(),
          username: Joi.string()
            .when('isGuest', {
              is: false,
              then: Joi.required()
            }),
          password: Joi.string().alphanum(),
          accessToken: Joi.string().alphanum(),
        })
        .options({
          allowUnknown: true
        })
        .without('password', 'accessToken')
    }
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
