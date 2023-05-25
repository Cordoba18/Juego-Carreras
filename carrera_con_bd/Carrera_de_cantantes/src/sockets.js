import { emit } from 'nodemon';
import Note from './models/Note'

export default (io) =>  {
    io.on('connection', (socket) => {
        //  const emitNotes = async () => {
        //     const notes = await Note.find();
        //     console.log(notes);
        // };
        // emitNotes();
        // socket.on('client:newnote', async (data) =>{
        //     const newnote = new Note(data);
        //     const savedNote = await newnote.save();
        //     io.emit('server:newnote', savedNote);
        // });
        // socket.on("client:deletenote", async (id) =>{
        //     await Note.findByIdAndDelete(id);
        //     emitNotes();
        // });
        // socket.on("client:updatenote", async (updateNote) =>{
        //     await Note.findByIdAndUpdate(updateNote._id, {
        //         title: updateNote.title,
        //         description: updateNote.description
        //     })
        socket.on('usuarios:logueo', async (usuario) =>{
            const note = await Note.findOne({nombre_usuario: usuario});
            // if (note !== null && note.estado == null || note.estado == false) {

            // }
            io.sockets.emit('server:usuario', {
                datos :note,
                user : usuario,
                accion : "logueo",
            });
        });
        socket.on('usuarios:ingresados', async  (data) => {
        const nuevo_user = new Note(data);
            await nuevo_user.save();
         });
         socket.on('usuarios:registros', async  (data) => {
            const datos = await Note.find({sala: { $ne: null },
                $or: [
                  { nombre_usuario: data },
                  { nombre_participantes: data }
                ]
              });
              io.sockets.emit('server:registros', {
                datos : datos,
                user : data,
              }); 
             });

         socket.on('usuarios:salas_unirse', async  (data) => {
        const sala = await Note.findOneAndUpdate({ sala: data.sala },
            { $push: { nombre_participantes : data.user, 
                personaje_participantes : data.personaje }},
            { new: true });
            io.sockets.emit('server:participantes', {
                sala_datos : sala,
                user : data.user,
            }); 
         });
         socket.on('carrera:registros', async (data) => {
            const registro = await Note.findOneAndUpdate({ sala: data.sala },
                { $push: { registro_participantes : data.registro_participantes, 
                    registro_top : data.registro_top }},
                { new: true });
        }) ;    
    socket.on('usuarios:salas', async (data) => {
        const sala = new Note(data);
            await sala.save();
        }) ;    
    socket.on('carrera:start', (data) => {
            io.sockets.emit('carrera:start', data);
    }) ;    
    socket.on('carrera:carros', (data) => {
            io.sockets.emit('carrera:carros', data);
    }) ;  
    socket.on('carrera:finalizado', (dato) => {
        io.sockets.emit('carrera:finalizado', dato);
});    

})
}