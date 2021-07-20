const Usuarios = require('../Models/Usuario');

exports.getLista = async (req, res, next) => {
    try {
        const lista = await Usuarios.find();
        res.json(lista);
    } catch (error) {
        console.log('exports.getLista::', error);
        res.json({
            Error: error
        })
        next();
    }
}

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const elemento = await Usuarios.findById(id);
        if (!elemento) {
            res.status(404).json({
                mensaje: 'El usuario no ha sido encontrado'
            });
        }
        res.json(elemento);
    } catch (error) {
        console.log('exports.getById::', error);
        res.json({
            Error: error
        })
        next();
    }
}

exports.agregar = async (req, res, next) => {
    try {
        const elemento = new Usuarios(req.body);
        await elemento.save();
        res.json({ mensaje: 'Se creo el usuario con exito' });
    } catch (error) {
        console.log('exports.agregar::', error);
        res.json({
            Error: error
        })
        next();
    }
}

exports.actualizar = async (req, res, next) => {
    try {
        await Usuarios.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
        res.json({ mensaje: 'El usuario se actualizo con exito' });
    } catch (error) {
        console.log('exports.actualizar::', error);
        res.json({
            Error: error
        })
        next();
    }
}

exports.eliminar = async (req, res, next) => {
    try {
        await Usuarios.findOneAndRemove({ _id: req.params.id });
        res.json({ mensaje: 'El usuario se elimino con exito' })
    } catch (error) {
        console.log('exports.eliminar::', error);
        res.json({
            Error: error
        })
        next();
    }
}