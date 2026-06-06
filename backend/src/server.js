import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import { PORT, NODE_ENV } from './config/index.js';
import logger from './utils/logger.js';
import { initializeSockets } from './sockets/index.js';

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);
    await initializeSockets(server);

    server.listen(PORT, () => {
      logger.info(`[INFO] Server started on http://localhost:${PORT}`);
      logger.info(`[INFO] Environment: ${NODE_ENV}`);
    });
  } catch (error) {
    logger.error('[ERROR] Failed to start server', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (reason) => {
  logger.error('[ERROR] Unhandled Rejection', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('[ERROR] Uncaught Exception', error);
  process.exit(1);
});

startServer();
