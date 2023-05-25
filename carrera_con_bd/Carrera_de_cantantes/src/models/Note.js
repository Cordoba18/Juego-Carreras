import { Schema, model } from "mongoose";


const schema = new Schema({
    nombre_usuario : {
        type: String,
    },
    personaje : {
        type: String
    }, 
    sala : {
        type: String
    },
    nombre_participantes : {
        type: Array
    },
    personaje_participantes : {
        type: Array
    },
    registro_participantes: {
        type: Array
    },
    registro_top : {
        type: Array
    },
    estado : {
        type: Boolean
    },
    

},{
    timestamps: true
})

export default model ('Note', schema)