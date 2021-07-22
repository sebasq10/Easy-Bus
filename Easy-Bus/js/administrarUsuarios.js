(function () {

    let nombre = {};
    let primerA = {};
    let segundoA = {};
    let nacimiento = {};
    let usn = {};
    let contrasena = {};
    let contrasenaConf = {};
    let rolID = {};
    let btnAceptar = {};
    let btnLimpiar = {};
    let tempID = {};

    const inicializar = async () => {
        nombre = document.querySelector('#nombre');
        primerA = document.querySelector('#pApellido');
        segundoA = document.querySelector('#sApellido');
        nacimiento = document.querySelector('#fechaNacimiento');
        usn = document.querySelector('#usuario');
        contrasena = document.querySelector('#contrasena');
        contrasenaConf = document.querySelector('#contrasenaConf');
        rolID = document.querySelector('#rol');
        btnAceptar = document.querySelector('#btnAceptar');
        btnLimpiar = document.querySelector('#btnLimpiar');
        await getBases();
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

    const crearUsuario = async () => {

        /*  if (buscarUserName(usn.value) !== null) {
            window.alert("El usuario ya existe. Utilice otro.");
            return;
        }

        if (contrasenia.value !== contrasenaConf.value) {
            window.alert("La confirmación de contraseña es diferente. ");
            return;
        } */

        if (btnAceptar.innerHTML === "Aceptar") {
            fetch(`${url}/usuarios`, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(usuario),
            })
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
        } else {

            let user = listaUsuarios.find((x) => x._id == tempID);

            user.nombre = nombre.value;
            user.pApellido = primerA.value;
            user.sApellido = segundoA.value;
            user.fechaNacimiento = nacimiento.value;
            user.usuario = usn.value;
            user.contrasena = contrasena.value;
            user.rol = rolID.value;
            btnAceptar.innerHTML = "Aceptar";

            fetch(`${url}/usuarios/${tempID}`, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(user),
            })
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
        }

        tempID = "";
        getBases();
        tabla();
        limpiarDatos();
    }

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

        let controlesEstado = document.getElementsByClassName("btnEstado");
        let controlesEditar = document.getElementsByClassName("btnEditar");
        let controlesEliminar = document.getElementsByClassName("btnEliminar");


        listaUsuarios.forEach(usuario => {
            let fondoDes = "";
            let rolUsuario = listaRoles.find((id) => id._id == usuario.rol);
            let estado = "";

            if (usuario.estado == "Activo") {
                fondoDes = "class= 'bg-white'";
                estado = "Desactivar";
            } else {
                fondoDes = "class= 'bg-light'";
                estado = "Activar";
            }

            tbAdmin.innerHTML += `<tr ${fondoDes}>
            <td>${usuario._id}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.pApellido}</td>
            <td>${usuario.sApellido}</td>
            <td>${usuario.fechaNacimiento}</td>
            <td>${rolUsuario.tipoRol}</td>
            <td>${usuario.metodoPago}</td>
            <td>${usuario.estado}</td>
            <td>

            <button 
            data-id="${usuario._id}" 
            class="btn btnEstado btn-sm mb-2 me-md-2">
             ${estado}</button>
            <br>
            <button 
            data-id="${usuario._id}" 
            class="btn btnEditar btn-sm mb-2 me-md-2">
            Editar</button>
            <br>
            <button 
            data-id="${usuario._id}" 
            class="btn btn-default bg-light border btnEliminar btn-sm me-md-2">
            Eliminar</button>

            </td>

            </tr>`;
        });

        for (var i = 0; i < listaUsuarios.length; ++i) {
            controlesEditar[i].onclick = editarUsuario;
            controlesEliminar[i].onclick = eliminarUsuario;
            controlesEstado[i].onclick = cambiarEstado;
        }

    };

    const editarUsuario = (e) => {
        let btnEditar = e.target;
        let idBtn = btnEditar.dataset.id;
        let user = listaUsuarios.find((usnId) => usnId._id == idBtn);
        tempID = user._id;

        nombre.value = user["nombre"];
        primerA.value = user["pApellido"];
        segundoA.value = user["sApellido"];
        fechaNacimiento.value = user["fechaNacimiento"];
        usn.value = user["usuario"];

        if (user["rol"] == "60f849fb3eff242d77c9dece") {
            rolID.value = 'Administrador';
        } else if (user["rolID"] == "60f849fe3eff242d77c9ded0") {
            rolID.value = 'Chofer';
        } else {
            rolID.value = 'Cliente';
        }

        btnAceptar.innerHTML = "Modificar";
    };

    const eliminarUsuario = (e) => {
        let btnEliminar = e.target;
        let id = btnEliminar.dataset.id;
        let user = listaUsuarios.find((user) => user._id == id);

        fetch(`${url}/usuarios/${user._id}`, {
            method: "DELETE"
        })
            .then((res) => console.log(res))
            .catch((error) => console.log(error));

        getBases();

        limpiarDatos();
        tabla();
    };

    const cambiarEstado = (e) => {

        let btnEstado = e.target;
        let idBtn = btnEstado.dataset.id;
        let user = listaUsuarios.find((usnId) => usnId._id == idBtn);

        if (user.estado == "Activo") {
            user["estado"] = "Inactivo";
        } else {
            user["estado"] = "Activo";
        }


        fetch(`${url}/usuarios/${user._id}`, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(user),
        })
            .then((res) => console.log(res))
            .catch((error) => console.log(error));

        getBases();
        tabla();
    };

    inicializar();
}
)();