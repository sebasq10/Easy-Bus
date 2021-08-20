(function () {

    let mes = {};
    let gastosMes = {};
    let transaccionesCliente = [];

    const inicializar = async () => {
        mes = document.querySelector('#mes');
        gastosMes = document.querySelector('#gastosMes');

        await getTransaccionesCliente();
        await fetchRutas();

        console.log(transaccionesCliente);

        tabla();
        bind();
    };

    const bind = () => {
        mes.onchange = infoTarget;
    };

    const infoTarget = (e) => {
        const { name, value } = e.target;
        transaccion[name] = value;
    };

    const tabla = () => {
        let tbTrans = document.querySelector('#tbTransacciones');
        tbTrans.innerHTML = '';
        
        transaccionesCliente.forEach((transaccion) => {
            if (transaccion.exito == true) {

                let rutaTransaccion = listaRutas.find(ruta => ruta._id == transaccion.ruta);
                let chofer= listaUsuarios.find(usuario => usuario._id == transaccion.chofer);

                tbTrans.innerHTML += `<tr>
                <td>${transaccion.fecha}</td>
                <td>${rutaTransaccion.nombreRuta}</td>
                <td>${chofer.usuario}</td>
                <td>${rutaTransaccion.precio}</td>
                </tr>`;
            }

        });
    };

    const getTransaccionesCliente = async () => {

        await fetchTransacciones();
        await fetchUsuarios();
        let cliente = listaUsuarios.find(usuario => usuario.usuario == sessionStorage.key(0));

        listaTransacciones.forEach(trans => {
            if (trans.cliente == cliente._id) {
                transaccionesCliente.push(trans);
            }
        });

        console.log(transaccionesCliente);
    };

    inicializar();
})();