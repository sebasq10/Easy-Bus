(function () {

    let usuario = {};
    let contrasena = {};
    let nombre = {};
    let pApellido = {};
    let sApellido = {};
    let fechaNacimiento = {};
    let rol = {};
    let metodoPago = {};
    let estado = {};
    let btnAceptar = {};
    let btnLimpiar = {};

    const inicializar = async () => {
        usuario = document.querySelector('#usuario');
        contrasena = document.querySelector('#contrasena');
        contrasenaConf = document.querySelector('#contrasenaConf');
        nombre = document.querySelector('#nombre');
        pApellido = document.querySelector('#pApellido');
        sApellido = document.querySelector('#sApellido');
        fechaNacimiento = document.querySelector('#fechaNacimiento');
        btnAceptar = document.querySelector('#btnAceptar');
        btnLimpiar = document.querySelector('#btnLimpiar');
        btnAceptar.onclick = crearUsuario;
        btnLimpiar.onclick = limpiarDatos;
        await fetchUsuarios();
        await fetchRoles();
        bind();
    };

    const bind = () => {
        usuario.onchange = infoTarget;
        contrasena.onchange = infoTarget;
        nombre.onchange = infoTarget;
        pApellido.onchange = infoTarget;
        sApellido.onchange = infoTarget;
        fechaNacimiento.onchange = infoTarget;
        estado = infoTarget;
    };

    const infoTarget = (e) => {
        const { name, value } = e.target;
        //console.log(name, ':', value)
        usuario[name] = value;
    };


    const crearUsuario = async () => {
        let userTemp = listaUsuarios.find(usn => usn.usuario == usuario.value);
        let rolTemp = listaRoles.find(rol=> rol.tipoRol== "cliente");
        usuario.rol= rolTemp._id;

        if (nombre.value === "" || pApellido.value === "" || sApellido.value === "" || fechaNacimiento.value === ""
            || usuario.value === "" || contrasena.value === "" || contrasenaConf.value === "") {
            window.alert("Por favor rellenar todos los campos.");
            return;
        }

        if (contrasena.value !== contrasenaConf.value) {
            window.alert("La confirmación de contraseña es diferente. ");
            return;
        }
        
        //Arreglar Sebas TypeOf
        if (typeof (userTemp) === "undefined") {

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
            window.alert("El usuario ya existe. Utilice Otro");
        }
        limpiarDatos();
    };

    const limpiarDatos = () => {
        nombre.value = '';
        pApellido.value = '';
        sApellido.value = '';
        fechaNacimiento.value = '';
        usuario.value = '';
        contrasena.value = '';
        contrasenaConf.value = '';
    };

    inicializar();
})();