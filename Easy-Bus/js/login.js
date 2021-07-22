(function () {

    let btnIngresar = {};
    let adminUser = {};
    let adminPass = {};

    const inicializar = async () => {
        btnIngresar = document.querySelector('#btnIngresar');
        adminUser = document.querySelector('#usuario');
        adminPass = document.querySelector('#contrasena');

        btnIngresar.onclick = validarUsuario;

        await fetchUsuarios();
    };

    const validarUsuario = (e) => {

        let user = listaUsuarios.find(usu => usu.usuario == adminUser.value);

        if (adminUser.value === "" || adminPass.value === "") {
            window.alert("Por favor rellenar todos los campos.");
            return;
        }
        if (user == null) {
            window.alert("Usuario o contrasena incorrectos.");
            return;
        }
        if (user.usuario === adminUser.value && adminPass.value === user.contrasena) {
            window.location = "./usuariosAdmin.html";
        } else {
            window.alert("Usuario o contrasena incorrectos.");
        }
    };

    inicializar();
    
})();