export const initializeSockets = async (server) => {
  const { Server } = await import('socket.io');
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('ping', () => {
      socket.emit('pong');
    });
  });

  return io;
};
