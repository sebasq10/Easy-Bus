(function () {
    let tarjetas = {};
    let btnIngresar = {};
    let newMonedero = {};

    const inicializar = async () => {
        tarjetas = document.querySelector('#numTarjeta')
        btnIngresar = document.querySelector('#btnIngresar');

        btnIngresar.onclick = IngresarTarjeta;
        await fetchMonederos();
        await fetchUsuarios();
        bind
    };

    const bind = () => {
       tarjetas.onchange = infoTarget;
    };

    const infoTarget = (e) => {
        const { name, value } = e.target;
        monedero[name] = value;
    };

    const IngresarTarjeta = (e) => {

        let userTemp = listaUsuarios.find(usn => usn.usuario == sessionStorage.key(0));
        
                monedero.usuarioId == userTemp._id;
                monedero.cantidadDinero == 0;
       

                fetch(`${url}/monederos`, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(monedero),
                })
                    .then((res) => monederoTemp= res.body)
                    .catch((error) => console.log(error));
            
            window.alert("Tarjeta Ingresada");
            limpiar();
        
    };

    const limpiar = () => {
        montoRecarga.value = "";
    }


    inicializar();

})();