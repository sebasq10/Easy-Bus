const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const monederoSchema = new Schema({
    usuarioId: {
        type: ObjectId,
        ref: "Usuarios",
        required: true
    },
    cantidadDinero: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Monederos', monederoSchema);