const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RolSchema = new Schema({
    tipoRol: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    descripcion: {
        type: String
    }
});

module.exports = mongoose.model('Roles', RolSchema);