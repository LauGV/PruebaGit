var Io = require('socket.io');
const storage = require('node-persist');

var SocketIO = function(config) {
   storage.init({
      dir: 'scratch',
      stringify: JSON.stringify,
      parse: JSON.parse,
      encoding: 'utf8'
   });
   config = config || {};
   var io = Io.listen(config.server);

   io.sockets.on('connection', function(socket) {
      socket.join('some::room');

      socket.on('login', function(data) {
         if (data.user != '') {
            var id = socket.id;
            storage.setItem(`ID:${data.user.idUsuario}`, id);
            var message = `Conectado correctamente: ${new Date().toString()} ID: ${id}`
            socket.broadcast.to(id).emit('hello', {
               mensaje: message
            });
         }
      });

      socket.on('createMeeting', function(data) {
         var users = JSON.parse(data.users);
         console.log(users)
         users.forEach(f => {
            console.log(f)
            storage.getItem(`ID:${f.idUsuario}`).then(function(socketId) {
               console.log(socketId);
               if (socketId) {
                  socket.broadcast.to(socketId).emit('message', data);
               }
            });
         });
      });

      socket.on('disconnect', function() {
         // delete app_user[socket.store.id];
         /*console.log(data);*/
      });
   });
};

module.exports = SocketIO;
