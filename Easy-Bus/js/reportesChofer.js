(function () {

    let fechaIngreso = {};
    let cantidadIngreso = {};
    let transaccionesChofer = [];

    const inicializar = async () => {
        fechaIngreso = document.querySelector('#fechaIngreso');
        cantidadIngreso = document.querySelector('#cantidadIngreso');

        await getTransaccionesChofer();
        await fetchRutas();
        console.log(listaUsuarios);
        tabla();
        bind();
    };

    const bind = () => {
        fechaIngreso.onchange = infoTarget;
    };

    const infoTarget = (e) => {
        const { name, value } = e.target;
        rutas[name] = value;
    };

    const tabla = () => {
        let tbRechazo = document.querySelector('#tbRechazo');
        tbRechazo.innerHTML = '';
        
        transaccionesChofer.forEach((transaccion) => {
            if (transaccion.exito == false) {

                let rutaTransaccion = listaRutas.find(ruta => ruta._id == transaccion.ruta);
                let cliente= listaUsuarios.find(usuario => usuario._id == transaccion.cliente);

                tbRechazo.innerHTML += `<tr>
                <td>${transaccion.fecha}</td>
                <td>${rutaTransaccion.nombreRuta}</td>
                <td>${cliente.usuario}</td>
                <td>Fondos Insuficientes</td>
                </tr>`;
            }

        });
    };

    const getTransaccionesChofer = async () => {

        await fetchTransacciones();
        await fetchUsuarios();
        let chofer = listaUsuarios.find(usuario => usuario.usuario == sessionStorage.key(0));

        listaTransacciones.forEach(trans => {
            if (trans.chofer == chofer._id) {
                transaccionesChofer.push(trans);
            }
        });
    };

    inicializar();
})();