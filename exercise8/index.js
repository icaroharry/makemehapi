const Hapi = require('hapi');
const server = new Hapi.Server();
const fs = require('fs');
const Path = require('path');
const rot13 = require('rot13-transform');

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply(fs.createReadStream(Path.join(__dirname, 'file.txt')).pipe(
      rot13()));
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
