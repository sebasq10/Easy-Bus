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
        if (user.estado == "Inactivo") {
            window.alert("Usuario Inactivo.");
            return;
        }
        if (user.usuario === adminUser.value && adminPass.value === user.contrasena) {
            if(user.rol ==="60f7a42e3d44fc667cf69271"){ /*_id admin*/
                window.location = "./usuariosAdmin.html";
            }else if (user.rol ==="60fa55ffed155caf2d9cd502") { /*_id Cliente*/
                window.location = "./indexCliente.html";
            }else{
                window.location = "./indexChofer.html";
            }
            
        } else {
            window.alert("Usuario o contrasena incorrectos.");
        }
    };
    inicializar();   
})();