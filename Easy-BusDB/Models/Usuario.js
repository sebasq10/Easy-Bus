const mongoose = require('mongoose');
const dateFormat = require('dateformat');
const { ObjectId } = require('bson');

let fechaActual = dateFormat(new Date(), 'dd/mm/yyyy');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    usuario: {
        type: String,
        required: true,
        trim: true
    },
    contrasena: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    pApellido: {
        type: String,
        required: true,
        trim: true
    },
    sApellido: {
        type: String,
        trim: true
    },
    fechaNacimiento: {
        type: String,
        default: fechaActual
    },
    rol: {
        type: ObjectId,
        ref: "Roles",
        required: true
    },
    ruta: {
        type: ObjectId,
        ref: "Rutas"
    },
    metodoPago: {
        type: ObjectId,
        ref: "Monederos"
    },
    estado: {
        type: String,
        required: true,
        trim: true,
        enum: {
            values: ["Activo", "Inactivo"],
            message: `{VALUE} no es valido.`
        },
        default: "Activo"
    }
});

module.exports = mongoose.model('Usuarios', usuarioSchema);