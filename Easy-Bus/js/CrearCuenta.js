(function () {

    let usuarioTxt = {};
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
    let usuarioId = {};
    let cantidadDinero = {};
    let tarjetas = {};


    const inicializar = async () => {
        usuarioTxt = document.querySelector('#usuario');
        contrasena = document.querySelector('#contrasena');
        contrasenaConf = document.querySelector('#contrasenaConf');
        nombre = document.querySelector('#nombre');
        pApellido = document.querySelector('#pApellido');
        sApellido = document.querySelector('#sApellido');
        fechaNacimiento = document.querySelector('#fechaNacimiento');
        btnAceptar = document.querySelector('#btnAceptar');
        btnLimpiar = document.querySelector('#btnLimpiar');

        await fetchUsuarios();
        await fetchRoles();
        await fetchMonederos();
        bind();
    };

    const bind = () => {
        usuarioTxt.onchange = infoTarget;
        contrasena.onchange = infoTarget;
        nombre.onchange = infoTarget;
        pApellido.onchange = infoTarget;
        sApellido.onchange = infoTarget;
        fechaNacimiento.onchange = infoTarget;
        estado = infoTarget;
        btnAceptar.onclick = crearUsuario;
        btnLimpiar.onclick = limpiarDatos;

    };

    const infoTarget = (e) => {
        const { name, value } = e.target;
        usuario[name] = value;
    };

    const crearUsuario = async () => {
        let userTemp = listaUsuarios.find(usn => usn.usuario == usuarioTxt.value);
        let rolTemp = listaRoles.find(rol => rol.tipoRol == "cliente");
        usuario.rol = rolTemp._id;

        let monedero = {};

        if (nombre.value === "" || pApellido.value === "" || sApellido.value === "" || fechaNacimiento.value === ""
            || usuarioTxt.value === "" || contrasena.value === "" || contrasenaConf.value === "") {
            window.alert("Por favor rellenar todos los campos.");
            return;
        }
        if (contrasena.value !== contrasenaConf.value) {
            window.alert("La confirmación de contraseña es diferente. ");
            return;
        }
        if (typeof (userTemp) === "undefined") {
            usuario.contrasena = btoa(contrasena.value); //btoa Metodo propio de html para encriptar
            console.log(usuario.contrasena);

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
            await fetchUsuarios();

            let usuarioID = listaUsuarios.find(uid => uid.usuario == usuario.usuario);
            monedero.usuarioId = usuarioID._id;
            monedero.tarjetas = "0"
            crearMonedero(monedero);

        } else {
            window.alert("El usuario ya existe. Utilice Otro");
        }
        limpiarDatos();
        window.location = "./login.html";


    };
    const crearMonedero = (monedero) => {
        fetch(`${url}/monederos`, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(monedero),
        })
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
    };

    const limpiarDatos = () => {
        nombre.value = '';
        pApellido.value = '';
        sApellido.value = '';
        fechaNacimiento.value = '';
        usuarioTxt.value = '';
        contrasena.value = '';
        contrasenaConf.value = '';
    };

    inicializar();
})();