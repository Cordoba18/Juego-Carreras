const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io');

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () =>{
    console.log('Escuchando mi puerto', app.get('port'));

});


const io = SocketIO(server);


io.on('connection', (socket) => {
    console.log('Nueva conexion' , socket.id)

    socket.on('usuarios:ingresados', (data) => {
        console.log(data.user);
        io.sockets.emit('usuarios:ingresados', data);
         });
    socket.on('usuarios:salas', (data) => {
        io.sockets.emit('usuarios:salas', data);
        }) ;    
    socket.on('carrera:start', (data) => {
            io.sockets.emit('carrera:start', data);
    }) ;    
    socket.on('carrera:carros', (data) => {
            io.sockets.emit('carrera:carros', data);
    }) ;  
    socket.on('carrera:finalizado', (dato) => {
        io.sockets.emit('carrera:finalizado', dato);
}) ;    
})