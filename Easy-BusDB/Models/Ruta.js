const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RutasSchema = new Schema({
    CTP: {
        type: String,     
        required: true,
        trim: true,
        uppercase: true
    },
    nombreRuta: {
        type: String,
        required: true
    },
    provincia:{
        type: String,
        required: true
    },
    canton:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Rutas', RutasSchema);