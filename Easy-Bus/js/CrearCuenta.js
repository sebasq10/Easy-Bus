(function () {

    let nombre = {};
    let primerA = {};
    let segundoA = {};
    let nacimiento = {};
    let correo = {};
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
        correo = document.querySelector('#correo');
        usn = document.querySelector('#usn');
        contrasena = document.querySelector('#contrasenia');
        contrasenaConf = document.querySelector('#contrasenaConf');
        rolID = "2";
        btnAceptar = document.querySelector('#btnAceptar');
        btnLimpiar = document.querySelector('#btnLimpiar');
        btnAceptar.onclick = crearUsuario;
        btnLimpiar.onclick = limpiarDatos;
    };

    const bind = () => {
        nombre.onchange = infoTarget;
        nombre.onchange = infoTarget;
        primerA.onchange = infoTarget;
        segundoA.onchange = infoTarget;
        nacimiento.onchange = infoTarget;
        correo.onchange = infoTarget;
        usn.onchange = infoTarget;
        contrasena.onchange = infoTarget;
        contrasenaConf.onchange = infoTarget;
        rolID.onchange = infoTarget;
    };

    const infoTarget = (e) => {
        const { name, value } = e.target;
        //console.log(name, ':', value)
        usuario[name] = value;
    };


    const crearUsuario = () => {
        usuario['metodoPagoID'] = 'NULL';
        usuario['usuarioID'] = listaUsuarios.length + 1;

        if(nombre.value === "" || primerA.value === "" || segundoA.value === "" || nacimiento.value === "" 
        || correo.value === "" || usn.value === "" || contrasena.value === "" || contrasenaConf.value === ""){
            window.alert("Por favor rellenar todos los campos.");
            return;
        }

        if(buscarUserName(usn.value) !== null){
            window.alert("El usuario ya existe. Utilice otro.");
            return;
        }

        if(buscarCorreo(correo.value) !== null){
            window.alert("El correo ya se encuenta registrado.");
            return;
        }

        if(contrasenia.value !== contrasenaConf.value){
            window.alert("La confirmación de contraseña es diferente. ");
            return;
        }

        if (btnAceptar.innerHTML === "Aceptar") {
            listaUsuario.push(Object.assign({}, usuario));
        } else {
            listaUsuario[tempID].nombre = nombre.value;
            listaUsuario[tempID].apellido1 = primerA.value;
            listaUsuario[tempID].apellido2 = segundoA.value;
            listaUsuario[tempID].fechaNacimiento = nacimiento.value;
            istaUsuario[tempID].correo = correo.value;
            listaUsuario[tempID].usn = usn.value;
            listaUsuario[tempID].contrasena = contrasena.value;
            listaUsuario[tempID].rolID = rolID.value;
            tempID = -1;
            btnAceptar.innerHTML = "Aceptar";
        }
        limpiarDatos();
    };

    const limpiarDatos = () => {
        nombre.value = '';
        primerA.value = '';
        segundoA.value = '';
        nacimiento.value = '';
        correo.value = '';
        usn.value = '';
        contrasena.value = '';
        contrasenaConf.value = '';
        rolID.value = 'Seleccione una opcion';
    };

    inicializar();
})();