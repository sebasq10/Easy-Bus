const mongoose = require('mongoose');
const dateFormat = require('dateformat');
const { ObjectId } = require('bson');

let fechaActual = dateFormat(new Date(), 'isoDate');

const Schema = mongoose.Schema;

const transaccionSchema = new Schema({
    ruta: {
        type: ObjectId,
        ref: "Rutas",
        required: true
    },
    chofer: {
        type: ObjectId,
        ref: "Usuarios",
        required: true
    },
    cliente: {
        type: ObjectId,
        ref: "Usuarios",
        required: true
    },
    fecha: {
        type: String,
        required: true,
        default: fechaActual
    },
    exito: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Transacciones', transaccionSchema);