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

    let tempID = {};

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

        if (btnAceptar.innerHTML === "Aceptar") {
            listaUsuario.push(Object.assign({}, usuario));
        } else {
            listaUsuario[tempID].nombre = nombre.value;
            listaUsuario[tempID].apellido1 = primerA.value;
            listaUsuario[tempID].apellido2 = segundoA.value;
            listaUsuario[tempID].fechaNacimiento = nacimiento.value;
            listaUsuario[tempID].usn = usn.value;
            listaUsuario[tempID].contrasena = contrasena.value;
            listaUsuario[tempID].rolID = rolID.value;
            tempID = -1;
            btnAceptar.innerHTML = "Aceptar";
        }


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
            let fondoDes = "";
            if (usuario.rolID == 0) {
                rol = 'Administrador';
            } else if (usuario.rolID == 1) {
                rol = 'chofer';
            } else {
                rol = 'cliente';
            }

            if (usuario.activo == 'A') {
                activo = 'Activo';
                cambiarEstado = 'Desactivar';
                fondoDes = "class= 'bg-white'";
            } else {
                activo = 'Inactivo';
                cambiarEstado = 'Activar';
                fondoDes = "class= 'bg-light'";
            }


            tbAdmin.innerHTML += `<tr ${fondoDes}>
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
            class="btn btnEstado btn-sm mb-2 me-md-2">
            ${cambiarEstado}</button>
            <br>
            <button 
            data-id="${usuario.usuarioID}" 
            class="btn btnEditar btn-sm mb-2 me-md-2">
            Editar</button>
            <br>
            <button 
            data-id="${usuario.usuarioID}" 
            class="btn btn-default bg-light border btnEliminar btn-sm me-md-2">
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
        let btnEditar = e.target;
        let id = parseInt(btnEditar.dataset.id);
        tempID = id - 1;
        let user = buscarUsuario(id);

        nombre.value = user["nombre"];
        primerA.value = user["apellido1"];
        segundoA.value = user["apellido2"];
        fechaNacimiento.value = user["fechaNacimiento"];
        usn.value = user["usn"];

        if (user["rolID"] == 0) {
            rolID.value = 'Administrador';
        } else if (user["rolID"] == 1) {
            rolID.value = 'Chofer';
        } else {
            rolID.value = 'Cliente';
        }

        btnAceptar.innerHTML = "Modificar";
    };

    const eliminarUsuario = (e) => {
        let btnEliminar = e.target;
        let id = parseInt(btnEliminar.dataset.id);
        let pos = id - 1;

        listaUsuario.splice(pos, 1);

        limpiarDatos();
        tabla();
    };

    const cambiarEstado = (e) => {
        let btnEstado = e.target;
        let id = parseInt(btnEstado.dataset.id);
        let user = buscarUsuario(id);

        if (user.activo == "A") {
            user.activo = 'I';
            btnEstado.innerHTML = 'Activar'
        } else {
            user.activo = 'A';
            btnEstado.innerHTML = 'Desactivar'
        }

        tabla();
    };

    inicializar();
})();