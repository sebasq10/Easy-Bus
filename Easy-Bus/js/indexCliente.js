(function () {
    let monedero = {};
    let btnRecargar = {};
    let montoRecarga = {};

    let tempID = {};

    const inicializar = async () => {
        monedero = document.querySelector('#monedero')
        btnRecargar = document.querySelector('#btnRecargar');
        montoRecarga = document.querySelector('#montoRecarga')

        btnRecargar.onclick = validarMonto;
        await fetchMonederos();
        await fetchUsuarios();
        mostrar_monedero();

    };


    const mostrar_monedero = () => {
        //let userTemp= listaUsuariosfind(u => u.usuario == )
        if (validarSesion()==true) {
            let usuarioTemp = listaUsuarios.find(us => us.usuario == sessionStorage.key(0));
            let monederoTemp = listaMonederos.find(mo => mo.usuarioId == usuarioTemp._id);
            monedero.value= monederoTemp.cantidadDinero
        }
    }

    const validarMonto = (e) => {
        if (validarSesion()==true) {
            if (montoRecarga.value === "" || montoRecarga.value <= 0) {
                window.alert("Por favor ingresar un monto valido.");
                return;
            }
            let usuarioTemp = listaUsuarios.find(us => us.usuario == sessionStorage.key(0));
            let monederoTemp = listaMonederos.find(mo => mo.usuarioId == usuarioTemp._id);            
            tempID = monederoTemp._id;
            monederoTemp.cantidadDinero = monederoTemp.cantidadDinero + parseInt(montoRecarga.value);
            fetch(`${url}/monederos/${tempID}`, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(monederoTemp),
            })
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
            mostrar_monedero();
            window.alert("Monto Recargado");
            limpiar();
        }
        };

    const limpiar = () =>{
        montoRecarga.value = "";
    }


    inicializar();
    
})();