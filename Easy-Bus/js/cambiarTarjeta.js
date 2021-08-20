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
        let monederoTemp = listaMonederos.find(mon => mon.usuarioId == userTemp._id);
                monederoTemp.tarjetas == numTarjeta.value;      

                fetch(`${url}/monederos/${monederoTemp}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    method: "PUT",
                    body: JSON.stringify(monederoTemp),
                })
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
            
            window.alert("Tarjeta Actulizada");
            limpiar();
        
    };

    const limpiar = () => {
        montoRecarga.value = "";
    }


    inicializar();

})();