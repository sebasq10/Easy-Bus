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

    const IngresarTarjeta = async() => {

        let userTemp = listaUsuarios.find(usn => usn.usuario == sessionStorage.key(0));
        let monederoTemp = listaMonederos.find(mon => mon.usuarioId == userTemp._id);
                monederoTemp.tarjetas = btoa(numTarjeta.value);      

                fetch(`${url}/monederos/${monederoTemp._id}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    method: "PUT",
                    body: JSON.stringify(monederoTemp),
                })
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
                await fetchMonederos();
            window.alert("Tarjeta Actulizada");

            limpiar();
            window.location = "./indexCliente.html";

        
    };

    const limpiar = () => {
        numTarjeta.value = "";
    }


    inicializar();

})();