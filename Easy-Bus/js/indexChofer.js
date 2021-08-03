(function () {

    let btnCobrar = {};
    let cantPasajero = {};
    let pasajero = {};
    let costoRuta = {};

    let tempID = {};

    const inicializar = async () => {
        btnCobrar = document.querySelector('#btnCobrar');
        cantPasajero = document.querySelector('#cantPasajero');
        pasajero = document.querySelector('#pasajero');
        costoRuta = document.querySelector('#costoRuta');
        btnCobrar.onclick = validarMonto;
        await fetchUsuarios();
        await fetchMonederos();
    };

    const validarMonto = (e) => {
        if (validarSesion()==true) {
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
            if (typeof userTemp === 'undefined'){
                window.alert("El usuario no existe. Intente de nuevo.");
                return;
            }
            else if(userTemp.usuario === pasajero.value ){
                if(userTemp.estado === "Inactivo"){
                    window.alert("Usuario Inactivo");
                    return;
                }
                let monederoTemp = listaMonederos.find(mo => mo.usuarioId == userTemp._id); //Usuario ID Sebas
                tempID = monederoTemp._id;
                monederoTemp.cantidadDinero = monederoTemp.cantidadDinero - (parseInt(costoRuta.value)*parseInt(cantPasajero.value));
                if (monederoTemp.cantidadDinero <= 0){
                    window.alert("Fondos Insuficientes. Transacción cancelada")
                    location.reload();
                    return;
                }
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
                limpiar();
                window.alert("Transacción Exitosa");
                return;
            }
        }else{
            window.alert("Por favor vuelva a ingresar sus datos de inicio de sesion.");
            window.location = "./login.html";
        }
        

         /*if (getById("usuarios", pasajero.value) === null) {
            window.alert("Cliente no existe");
            return;
        }if (getById("usuarios", pasajero.value).saldo <= 0){
            window.alert("Cliente sin saldo suficiente");
            return;
        }
         */
    };

    const limpiar = () => {
        cantPasajero.value = "";
        pasajero.value = "";
        costoRuta.value = "";
    }

    inicializar();

})();