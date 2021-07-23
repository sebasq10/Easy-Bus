(function () {

    let btnRecargar = {};
    let montoRecarga = {};

    const inicializar = async () => {
        btnRecargar = document.querySelector('#btnRecargar');
        montoRecarga = document.querySelector('#montoRecarga')

        btnRecargar.onclick = validarMonto;
    };

    const validarMonto = (e) => {

        if (montoRecarga.value === "" || montoRecarga.value <= 0) {
            window.alert("Por favor ingresar un monto valido.");
            return;
        } else {
            window.alert("Monto Recargado");
        }
    };

    inicializar();
    
})();