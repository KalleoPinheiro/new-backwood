/* eslint-disable no-console */
const http = require('http');
const debug = require('debug')('node:server');
const app = require('../src/app');

(() => {
  const normalizePort = val => {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  };

  const port = normalizePort(process.env.PORT || 3000);
  app.set('port', port);
  const server = http.createServer(app);

  const onError = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
      case 'EACCESS':
        console.error(`${bind} requires elevated provileges`);
        process.exit(1);
        break;

      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;

      default:
        throw error;
    }
  };

  const onListening = () => {
    const addr = server.address();
    const bind =
      typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`;
    debug(`Listening on ${bind}`);
  };

  app.listen(port);
  app.on('error', onError);
  app.on('listening', onListening);
  console.log(`Server running on port ${port}`);
})();
