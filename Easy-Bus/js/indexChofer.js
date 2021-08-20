(function () {

    let btnCobrar = {};
    let cantPasajero = {};
    let pasajero = {};
    let costoRuta = {};


    const inicializar = async () => {
        btnCobrar = document.querySelector('#btnCobrar');
        cantPasajero = document.querySelector('#cantPasajero');
        pasajero = document.querySelector('#pasajero');
        costoRuta = document.querySelector('#costoRuta');
        btnCobrar.onclick = validarMonto;

        await fetchUsuarios();
        await fetchMonederos();
        await fetchRutas();
        cargarRuta();
    };
    const cargarRuta = (e) => { 
        let usuarioTemp = listaUsuarios.find(us => us.usuario == sessionStorage.key(0));
        let rutasTemp = listaRutas.find((x) => x._id == usuarioTemp.ruta);
        document.getElementById(lblruta).value=rutasTemp.nombreRuta;
        document.getElementById(costoRuta).value=rutasTemp.precio;
    };
    const validarMonto = (e) => {
        let hayFondos = true;

        if (validarSesion() == true) {

            console.log(sessionStorage.key(0), sessionStorage.getItem(sessionStorage.key(0)));
            if (cantPasajero.value === "" || cantPasajero.value === 0) {
                window.alert("Por favor ingresar la cantidad de pasajeros a cobrar.");
                return;
            }
            else if (cantPasajero.value < 0) {
                window.alert("Por favor ingresar una cantidad válida.");
                return;
            }
            else if (costoRuta.value === "" || costoRuta.value === 0) {
                window.alert("Por favor ingresar el costo de la ruta.");
                return;
            }
            else if (costoRuta.value < 0) {
                window.alert("Por favor ingresar un costo válido.");
                return;
            }

            let userTemp = listaUsuarios.find(usn => usn.usuario == pasajero.value);

            if (typeof userTemp === 'undefined') {
                window.alert("El usuario no existe. Intente de nuevo.");
                return;
            }
            else if (userTemp.usuario === pasajero.value) {

                if (userTemp.estado === "Inactivo") {
                    window.alert("Usuario Inactivo");
                    return;
                }

                let monederoTemp = listaMonederos.find(mo => mo.usuarioId == userTemp._id);
                let monederoId = monederoTemp._id;
                monederoTemp.cantidadDinero = monederoTemp.cantidadDinero - (parseInt(costoRuta.value) * parseInt(cantPasajero.value));

                if (monederoTemp.cantidadDinero <= 0) {
                    window.alert("Fondos Insuficientes. Transacción cancelada")
                    location.reload();
                    transaccion.exito = false;
                    hayFondos = false;
                } else {
                    transaccion.exito = true;
                }

                let chofer = listaUsuarios.find(user => user.usuario == sessionStorage.key(0));
                let ruta = listaRutas.find(ru => ru._id == chofer.ruta);

                transaccion.ruta = ruta._id;
                transaccion.chofer = chofer._id;
                transaccion.cliente = userTemp._id;

                if (hayFondos) {
                    fetch(`${url}/monederos/${monederoId}`, {
                        headers: {
                            Accept: "application/json",
                            "Content-type": "application/json",
                        },
                        method: "PUT",
                        body: JSON.stringify(monederoTemp),
                    })
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error));


                    window.alert("Transacción Exitosa");
                }

                fetch(`${url}/transacciones`, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(transaccion)
                })
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));

                limpiar();
            }
        }
    };

    const limpiar = () => {
        cantPasajero.value = "";
        pasajero.value = "";
        costoRuta.value = "";
    }

    inicializar();

})();