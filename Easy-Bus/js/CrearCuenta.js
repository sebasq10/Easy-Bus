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
        rol = "60fa55ffed155caf2d9cd502"; //_ID Cliente
        estado = "Activo";
        btnAceptar = document.querySelector('#btnAceptar');
        btnLimpiar = document.querySelector('#btnLimpiar');
        btnAceptar.onclick = crearUsuario;
        btnLimpiar.onclick = limpiarDatos;
        await fetchUsuarios();
        bind();
    };

    const bind = () => {
        usuario.onchange = infoTarget;
        contrasena.onchange = infoTarget;
        nombre.onchange = infoTarget;
        pApellido.onchange = infoTarget;
        sApellido.onchange = infoTarget;
        fechaNacimiento.onchange = infoTarget;
        rol = infoTarget;
        estado = infoTarget;
    };

    const infoTarget = (e) => {
        const { name, value } = e.target;
        //console.log(name, ':', value)
        usuario[name] = value;
    };


    const crearUsuario = async () => {
        let userTemp = listaUsuarios.find(usn => usn.usuario == usuario.value);
        usuario['metodoPagoID'] = 'NULL';
        usuario['usuarioID'] = listaUsuarios.length + 1;

        if(nombre.value === "" || pApellido.value === "" || sApellido.value === "" || fechaNacimiento.value === "" 
        || usuario.value === "" || contrasena.value === "" || contrasenaConf.value === ""){
            window.alert("Por favor rellenar todos los campos.");
            return;
        }


        if(userTemp.usuario === usuario.value ){
            window.alert("El usuario ya existe. Utilice otro.");
            return;
        }

        if(contrasena.value !== contrasenaConf.value){
            window.alert("La confirmación de contraseña es diferente. ");
            return;
        }

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
        /*if (btnAceptar.innerHTML === "Aceptar") {
            listaUsuarios.push(Object.assign({}, usuario));
        } else {
            listaUsuarios[tempID].nombre = nombre.value;
            listaUsuarios[tempID].apellido1 = primerA.value;
            listaUsuarios[tempID].apellido2 = segundoA.value;
            listaUsuarios[tempID].fechaNacimiento = nacimiento.value;
            listaUsuarios[tempID].correo = correo.value;
            listaUsuarios[tempID].usn = usn.value;
            listaUsuarios[tempID].contrasena = contrasena.value;
            listaUsuarios[tempID].rolID = rolID.value;
            tempID = -1;
            btnAceptar.innerHTML = "Aceptar";
        }*/
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