import http from 'http';
import app from '../src/app';
import logger from '../src/logger';

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
      logger.error(`${bind} requires elevated provileges`);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`;
  logger.info(`Server running on port ${port} - ${bind}`);
};

app.listen(port);
app.on('error', onError);
app.on('listening', onListening);
