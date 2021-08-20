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
        await fetchRoles();
        await fetchMonederos();
    };
    
    const validarUsuario = (e) => {
        console.log(listaRoles);
        let user = listaUsuarios.find(usu => usu.usuario == adminUser.value);
        let rolTemp = listaRoles.find(rol=> rol.tipoRol== "cliente"); 
        let rolATemp = listaRoles.find(rol=> rol.tipoRol== "admin"); 
        let monederoTemp = listaMonederos.find(mon => mon.usuarioId == user._id) 


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
            guardarSesion(user.usuario,user.contrasena);           
            if(user.rol === rolATemp._id){ //no sirve 
                window.location = "./usuariosAdmin.html";
            }else if (user.rol ===rolTemp._id) {  //no sirve 
                if (typeof (monederoTemp) === "undefined") { //no sirve 
                    window.location = "./crearMonedero.html";
                } else {
                    window.location = "./indexCliente.html";
                }
            }else{
                window.location = "./indexChofer.html";
            }
            
        } else {
            window.alert("Usuario o contrasena incorrectos.");
        }
    };
    
    inicializar();   
})();