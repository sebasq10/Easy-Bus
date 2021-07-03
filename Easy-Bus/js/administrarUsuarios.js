(function () {

    let nombre = {};
    let primerA = {};
    let segundoA = {};
    let nacimiento = {};
    let usn = {};
    let contrasena = {};
    let contrasenaConf = {};
    let usuarioID = {};
    let rolID = {};
    let metodoPagoID = {};
    let btnAceptar = {};
    let btnLimpiar = {};


    const inicializar = () => {
        nombre = document.querySelector('#nombre');
        primerA = document.querySelector('#apellido1');
        segundoA = document.querySelector('#apellido2');
        nacimiento = document.querySelector('#fechaNacimiento');
        usn = document.querySelector('#usn');
        contrasena = document.querySelector('#contrasenia');
        contrasenaConf = document.querySelector('#contrasenaConf');
        rolID = document.querySelector('#rolID');
        btnAceptar = document.querySelector('#btnAceptar');
        btnLimpiar = document.querySelector('#btnLimpiar');
        bind();
        tabla();
    };

    const bind = () => {
        nombre.onchange = infoTarget;
        nombre.onchange = infoTarget;
        primerA.onchange = infoTarget;
        segundoA.onchange = infoTarget;
        nacimiento.onchange = infoTarget;
        usn.onchange = infoTarget;
        contrasena.onchange = infoTarget;
        contrasenaConf.onchange = infoTarget;
        rolID.onchange = infoTarget;
        btnAceptar.onclick = crearUsuario;
        btnLimpiar.onclick = limpiarDatos;
    };

    const infoTarget = (e) => {
        const { name, value } = e.target;
        //console.log(name, ':', value)
        usuario[name] = value;
    };

    const crearUsuario = () => {
        usuario['activo'] = 'A';
        usuario['metodoPagoID'] = 'NULL';
        usuario['usuarioID'] = listaUsuario.length + 1;
        listaUsuario.push(Object.assign({}, usuario));
        tabla();
        limpiarDatos();
    };

    const limpiarDatos = () => {
        nombre.value = '';
        primerA.value = '';
        segundoA.value = '';
        nacimiento.value = '';
        usn.value = '';
        contrasena.value = '';
        contrasenaConf.value = '';
        rolID.value = 'Seleccione una opcion';
    };

    const tabla = () => {
        let tbAdmin = document.querySelector('#tbUsuarios');
        tbAdmin.innerHTML = '';

        listaUsuario.forEach((usuario) => {
            let rol = "";
            let activo = "";
            let cambiarEstado = "";

            if (usuario.rolID == 0) {
                rol = 'Administrador';
            } else if (usuario.rolID == 1) {
                rol = 'chofer';
            } else {
                rol = 'cliente';
            }

            if (usuario.activo == 'A') {
                activo = 'activo';
                cambiarEstado = 'Desactivar';
            } else {
                activo = 'inactivo';
                cambiarEstado = 'Activar';
            }


            tbAdmin.innerHTML += `<tr>
            <td>${usuario.usuarioID}</td>
            <td>${usuario.usn}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido1}</td>
            <td>${usuario.apellido2}</td>
            <td>${usuario.fechaNacimiento}</td>
            <td>${rol}</td>
            <td>${usuario.metodoPagoID}</td>
            <td>${activo}</td>
            <td>

            <button 
            data-id="${usuario.usuarioID}" 
            class="btn btnEstado">
            ${cambiarEstado}</button>

            <button 
            data-id="${usuario.usuarioID}" 
            class="btn btnEditar">
            Editar</button>

            <button 
            data-id="${usuario.usuarioID}" 
            class="btn btn-default bg-light border btnEliminar">
            Eliminar</button>

            </td>

            </tr>`;
        });

        let controlesEstado = document.getElementsByClassName("btnEstado");
        let controlesEditar = document.getElementsByClassName("btnEditar");
        let controlesEliminar = document.getElementsByClassName("btnEliminar");

        for (var i = 0; i < listaUsuario.length; ++i) {
            controlesEditar[i].onclick = editarUsuario;
            controlesEliminar[i].onclick = eliminarUsuario;
            controlesEstado[i].onclick = cambiarEstado;
        }

    };

    const editarUsuario = (e) => {

    };

    const eliminarUsuario = (e) => {

    };

    const cambiarEstado = (e) => {
        let btnEstado = e.target;
        let id = btnEstado.dataset.id;
        let user = listaUsuario.filter((usuario) => {
            return usuario.usuarioID == id;
        });
        let id = parseInt(btnEstado.dataset.id);

        let userIndex = listaUsuario.findIndex((usuario) => usuario.usuarioID === id);
        user = listaUsuario[userIndex];

        if (user.activo == "A") {
            user.activo = 'I';
            btnEstado.innerHTML = 'Activar'
        } else {
            user.activo = 'A';
            btnEstado.innerHTML = 'Desactivar'
        }

        tabla();
    };

    const buscarUsuario = (id) => {
        listaUsuario.forEach(usuario => {
            console.log(usuario);
            return (1 === id) ? true : false;
        });
    };

    inicializar();
})();