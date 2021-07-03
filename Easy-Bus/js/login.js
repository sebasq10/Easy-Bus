(function () {

    const inicializar = () => {
        btnIngresar = document.querySelector('#btnIngresar');
        btnLimpiar = document.querySelector('#btnLimpiar');
        adminUser=document.querySelector('#adminUser');
        adminPass=document.querySelector('#adminPass');

        btnIngresar.onclick = validarUsuario;

        usuarioAdmin = {
            usuarioID:1,
            usn: "admin",
            contrasenia: "admin",
            nombre: "",
            apellido1: "",
            apellido2: "",
            fechaNacimiento: "",
            rolID: 0,
            metodoPagoID: "",
            activo: "A"
        }
        usuarioAdmin2 = {
            usuarioID:2,
            usn: "admin2",
            contrasenia: "admin2",
            nombre: "",
            apellido1: "",
            apellido2: "",
            fechaNacimiento: "",
            rolID: 0,
            metodoPagoID: "",
            activo: "A"
        }
        listaUsuario.push(Object.assign({}, usuarioAdmin));
        listaUsuario.push(Object.assign({}, usuarioAdmin2));
    };
    const limpiar = () => {
        adminUser.value = '';
        adminPass.value = '';
    };
    const validarUsuario = (e) => {
        let user = buscarUserName(adminUser.value);
        if (user.usn === adminUser.value && adminPass.value === user.contrasenia) {
            window.location = "./usuariosAdmin.html";
        } else {
            window.alert("Error de Contraseña");
        }
    };
    limpiar();
    inicializar();
})();