const Hapi = require('hapi');
const server = new Hapi.Server();
const inert = require('inert');
const Path = require('path');

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(inert, (err) => {
  if(err) throw err;
});

server.route({
  path: '/foo/bar/baz/{randomParam}',
  method: 'GET',
  handler: {
    directory: {
      path: Path.join(__dirname, 'public')
    }
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
