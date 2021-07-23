(function () {

    let btnRecargar = {};
    let cantPasajero = {};
    let pasajero = {};

    const inicializar = async () => {
        btnCobrar = document.querySelector('#btnCobrar');
        cantPasajero = document.querySelector('#cantPasajero')
        pasajero = document.querySelector('#pasajero')

        btnCobrar.onclick = validarMonto;
    };

    const validarMonto = (e) => {

        if (cantPasajero.value === "" || montoRecarga.value <= 0) {
            window.alert("Por favor ingresar la cantidad de pasajeros a cobrar.");
            return;
        } /*if (getById("usuarios", pasajero.value) === null) {
            window.alert("Cliente no existe");
            return;
        }if (getById("usuarios", pasajero.value).saldo <= 0){
            window.alert("Cliente sin saldo suficiente");
            return;
        }
         */
        else {
            window.alert("Factura Cancelada");
        }
    };

    inicializar();
    
})();