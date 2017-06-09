const Hapi = require('hapi');
const server = new Hapi.Server();
const fs = require('fs');
const Joi = require('joi');

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/upload',
  method: 'POST',
  handler: (request, reply) => {
    var body = '';
    request.payload.file.on('data', function(data) {
      body += data;
    });

    request.payload.file.on('end', function() {
      console.log(body);
      reply({
        description: request.payload.description,
        file: {
          data: body,
          filename: request.payload.file.hapi.filename,
          headers: request.payload.file.hapi.headers
        }
      });
    });
  },
  config: {
    payload: {
      output: 'stream',
      parse: true
    },
    validate: {
      payload: Joi.object({
        file: Joi.required(),
        description: Joi.string()
      })
    }
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
