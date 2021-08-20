const express = require('express');
const router = express.Router();

const usuarioController = require('../Controllers/usuarioControllers');
const rolController = require('../Controllers/rolControllers');
const rutasController = require('../Controllers/rutaControllers');
const monederoController = require('../Controllers/monederoControllers');
const transaccionController = require('../Controllers/transaccionControllers');


module.exports = function () {

    //Usuarios
    router.get('/usuarios', usuarioController.getLista)
    router.get('/usuarios/:id', usuarioController.getById)
    router.post('/usuarios', usuarioController.agregar)
    router.put('/usuarios/:id', usuarioController.actualizar)
    router.delete('/usuarios/:id', usuarioController.eliminar)

    //Roles
    router.get('/roles', rolController.getLista)
    router.get('/roles/:id', rolController.getById)
    router.post('/roles', rolController.agregar)
    router.put('/roles/:id', rolController.actualizar)
    router.delete('/roles/:id', rolController.eliminar)

    //Rutas
    router.get('/rutas', rutasController.getLista)
    router.get('/rutas/:id', rutasController.getById)
    router.post('/rutas', rutasController.agregar)
    router.put('/rutas/:id', rutasController.actualizar)
    router.delete('/rutas/:id', rutasController.eliminar)

    //Rutas
    router.get('/monederos', monederoController.getLista)
    router.get('/monederos/:id', monederoController.getById)
    router.post('/monederos', monederoController.agregar)
    router.put('/monederos/:id', monederoController.actualizar)
    router.delete('/monederos/:id', monederoController.eliminar)

    //transacciones
    router.get('/transacciones', transaccionController.getLista)
    router.get('/transacciones/:id', transaccionController.getById)
    router.post('/transacciones', transaccionController.agregar)
    router.put('/transacciones/:id', transaccionController.actualizar)
    router.delete('/transacciones/:id', transaccionController.eliminar)

    return router;
}