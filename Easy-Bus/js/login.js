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
        let monederoTemp = listaMonederos.find(mon => mon.usuarioId == user._id);
        let encriptedPS = btoa(adminPass.value);


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

        console.log(encriptedPS);
        console.log(user.contrasena);
        console.log(atob(encriptedPS));
        console.log(atob(user.contrasena));



        if (user.usuario === adminUser.value && encriptedPS === user.contrasena) {
            guardarSesion(user.usuario,user.contrasena);           
            if(user.rol === rolATemp._id){ 
                window.location = "./usuariosAdmin.html";
            }else if (user.rol ===rolTemp._id) {  
                if (typeof (monederoTemp) === "undefined") { 
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