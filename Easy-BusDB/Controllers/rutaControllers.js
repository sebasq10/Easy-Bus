const Rutas = require('../Models/Ruta');

exports.getLista = async (req, res, next) => {
    try {
        const lista = await Rutas.find();
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
        const elemento = await Rutas.findById(id);
        if (!elemento) {
            res.status(404).json({
                mensaje: 'La ruta no ha sido encontrado'
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
        const elemento = new Rutas(req.body);
        await elemento.save();
        res.json({ mensaje: 'Se creo la ruta con exito' });
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
        await Rutas.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
        res.json({ mensaje: 'La ruta se actualizo con exito' });
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
        await Rutas.findOneAndRemove({ _id: req.params.id });
        res.json({ mensaje: 'La ruta se elimino con exito' })
    } catch (error) {
        console.log('exports.eliminar::', error);
        res.json({
            Error: error
        })
        next();
    }
}