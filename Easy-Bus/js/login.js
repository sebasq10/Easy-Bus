(function () {

    const inicializar = () => {
        btnIngresar = document.querySelector('#btnIngresar');
        btnLimpiar = document.querySelector('#btnLimpiar');
        adminUser=document.querySelector('#adminUser');
        adminPass=document.querySelector('#adminPass');

        adminUser.onblur=perderFocus;
        adminPas.onblur=perderFocus;

        btnLimpiar.onclick = limpiar;
        btnIngresar.onclick = ingresar(adminUser);

    };

    /*const filtrarNombres= function(){
        let aux = listaUsuario.filter(fNombre)
        aux = (aux.length===0)?listaPersonas:aux
        cargarListaPersonas(aux);
    }*/

    const ingresar=function(e){
        if(e.adminUser==usuario.usn){
            return e;
        }else{
    }
    };
    const limpiar = () => {
        adminUser.value = '';
        adminPass.value = '';
    };
    const perderFocus= function (e) {
        const control=e.target;
        usuario[control.usn]=control.value;
        console.log(usuario);
    }
    inicializar();
})();