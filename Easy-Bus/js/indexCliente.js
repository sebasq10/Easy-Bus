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
        mostrar_monedero();

    };

    const mostrar_monedero = () => {
        let monederoTemp = listaMonederos.find(mo => mo.usuarioId == "60fb784ea3320c1bcc5a7565");
        monedero.value= monederoTemp.cantidadDinero
    }

    const validarMonto = (e) => {

        if (montoRecarga.value === "" || montoRecarga.value <= 0) {
            window.alert("Por favor ingresar un monto valido.");
            return;
        }
        let monederoTemp = listaMonederos.find(mo => mo.usuarioId == "60fb784ea3320c1bcc5a7565"); //Usuario ID Sebas
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
        };

    const limpiar = () =>{
        montoRecarga.value = "";
    }


    inicializar();
    
})();