(function () {

    let fechaIngreso = {};
    let cantidadIngreso = {};
    let btnCalcular = {};
    let btnLimpiar = {};

    let transaccionesChofer = [];

    const inicializar = async () => {
        fechaIngreso = document.querySelector('#fechaIngreso');
        cantidadIngreso = document.querySelector('#cantidadIngreso');
        btnCalcular = document.querySelector('#btnCalcular');
        btnLimpiar = document.querySelector('#btnLimpiar');

        await getTransaccionesChofer();
        await fetchRutas();

        btnCalcular.onclick = calcularIngresosDia;
        //btnLimpiar.onclick = limpiar;

        //Rellena comboBoxes.
        rellenarFechaIngreso();

        tabla();
    };

    const tabla = () => {
        let tbRechazo = document.querySelector('#tbRechazo');
        tbRechazo.innerHTML = '';

        transaccionesChofer.forEach((transaccion) => {
            if (transaccion.exito == false) {

                let rutaTransaccion = listaRutas.find(ruta => ruta._id == transaccion.ruta);
                let cliente = listaUsuarios.find(usuario => usuario._id == transaccion.cliente);

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

    const calcularIngresosDia = () => {
        let monto = 0;
        let hayTransaccion = false;
        if (fechaIngreso.selectedIndex == 0) {
            window.alert("Elija una fecha valida");
            return;
        }

        transaccionesChofer.forEach(trans => {
            let fecha = trans.fecha;

            if ((fechaIngreso.value == fecha)  && (trans.exito != false)) {
                let precioRuta = listaRutas.find(idRuta => idRuta._id == trans.ruta);
                monto += precioRuta.precio;
                hayTransaccion = true;
            }
        })

        if(hayTransaccion){
            cantidadIngreso.innerHTML= "" + monto;
        }else{
            cantidadIngreso.innerHTML= "No hubo ingresos este dia";
        }
    }

    const rellenarFechaIngreso = () => {
        var optionInicial = document.createElement("option");
        optionInicial.defaultSelected;
        optionInicial.text = "Seleccione Fecha";
        fechaIngreso.appendChild(optionInicial);

        transaccionesChofer.forEach(trans => {
            let fecha = trans.fecha
            let opcionesFecha = Array.from(fechaIngreso.options);
            let existe = false;
            let id = 0;

            while ((typeof (opcionesFecha) != "undefined") && (id <= opcionesFecha.length - 1)) {
                if (opcionesFecha[id].value == fecha) {
                    existe = true;
                }
                ++id;
            }

            if (!existe) {
                var opt = document.createElement("option");
                opt.value = fecha;
                opt.text = fecha;
                fechaIngreso.appendChild(opt);
            }
        })
    }

    inicializar();
})();