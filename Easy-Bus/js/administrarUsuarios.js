(function () {

    const globalsConfig = require(".\\globals.js");
    const usuarioPOJO = globalsConfig.usuario;
    const listaUsuarios = globalsConfig.listaUsuarios;

    let nombre = {};
    let primerA = {};
    let segundoA = {};
    let nacimiento = {};
    let usuario = {};
    let contrasena = {};
    let contrasenaConf = {};
    let rol = {};
    let activo = {};
    let metodoPago = {};
    let btnAceptar = {};
    let btnLimpiar = {};


    const inicializar = () => {
        nombre = document.querySelector('#nombre');
        primerA = document.querySelector('#primerA');
        segundoA = document.querySelector('#segundoA');
        nacimiento = document.querySelector('#nacimiento');
        usuario = document.querySelector('#usuario');
        contrasena = document.querySelector('#contrasena');
        contrasenaConf = document.querySelector('#contrasenaConf');
        rol = document.querySelector('#rol');
        btnAceptar = document.querySelector('#btnAceptar');
        btnLimpiar = document.querySelector('#btnLimpiar');
        bind();
    };

    const bind = () => {

        nombre.onchange = infoTarget;
        nombre.onchange = infoTarget;
        primerA.onchange = infoTarget;
        segundoA.onchange = infoTarget;
        nacimiento.onchange = infoTarget;
        usuario.onchange = infoTarget;
        contrasena.onchange = infoTarget;
        contrasenaConf.onchange = infoTarget;
        rol.onchange = infoTarget;
        btnAceptar.onclick= crearUsuario;
        btnLimpiar.onclick= limpiarDatos;
    };

    const infoTarget = (e) => {
        const { name, value } = e.target;
        //        console.log(name,':',value)
        usuarioPOJO[name] = value;
    };

    const crearUsuario= ()=>{

    }

    const limpiarDatos= () =>{

    };

})();