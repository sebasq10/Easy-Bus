(function () {

    let mes = {};
    let anio = {};
    let gastosMes = {};
    let btnCalcular = {};
    let btnLimpiar = {};

    let transaccionesCliente = [];

    const inicializar = async () => {
        mes = document.querySelector('#mes');
        gastosMes = document.querySelector('#gastosMes');
        anio = document.querySelector('#anio');
        btnCalcular = document.querySelector('#btnCalcular');
        btnLimpiar = document.querySelector('#btnLimpiar');


        //rellena arreglos.
        await getTransaccionesCliente();
        await fetchRutas();

        //rellena comboBoxes.
        rellenarMeses();
        rellenarAnio();


        //bind.
        btnCalcular.onclick = calcularGastosMes;
        btnLimpiar.onclick = limpiar;

        tabla();
    };



    const tabla = () => {
        let tbTrans = document.querySelector('#tbTransacciones');
        tbTrans.innerHTML = '';

        transaccionesCliente.forEach((transaccion) => {
            if (transaccion.exito == true) {

                let rutaTransaccion = listaRutas.find(ruta => ruta._id == transaccion.ruta);
                let chofer = listaUsuarios.find(usuario => usuario._id == transaccion.chofer);

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
    };

    const calcularGastosMes = () => {
        let monto = 0;
        let hayTransaccion = false;
        if (anio.selectedIndex == 0 || mes.selectedIndex == 0) {
            window.alert("Elija una fecha valida");
            return;
        }

        transaccionesCliente.forEach(trans => {
            let fecha = trans.fecha.split('-');

            if ((anio.value == fecha[0]) && (mes.value == fecha[1]) && (trans.exito != false)) {
                let precioRuta = listaRutas.find(idRuta => idRuta._id == trans.ruta);
                monto += precioRuta.precio;
                hayTransaccion = true;
            }
        })

        if (hayTransaccion) {
            gastosMes.innerHTML = "" + monto;
        } else {
            gastosMes.innerHTML = "No hubo gastos este mes";
        }

    };

    const rellenarAnio = () => {

        var optionInicial = document.createElement("option");
        optionInicial.defaultSelected;
        optionInicial.text = "Año";
        anio.appendChild(optionInicial);

        transaccionesCliente.forEach(trans => {
            let fecha = trans.fecha.split('-');
            let opcionesAnios = Array.from(anio.options);
            let existe = false;
            let id = 0;

            //Para que no se repitan opciones dentro del combo box "anios"
            while ((typeof (opcionesAnios) != "undefined") && (id <= opcionesAnios.length - 1)) {
                if (opcionesAnios[id].value == fecha[0]) {
                    existe = true;
                }
                ++id;
            }

            if (!existe) {
                var opt = document.createElement("option");
                opt.value = fecha[0];
                opt.text = fecha[0];
                anio.appendChild(opt);
            }
        })
    };

    const rellenarMeses = () => {
        var optionInicial = document.createElement("option");
        optionInicial.defaultSelected;
        optionInicial.text = "Mes";
        mes.appendChild(optionInicial);

        transaccionesCliente.forEach(trans => {
            //YYYY-MM-DD
            //[0]-[1]-[2]
            let fecha = trans.fecha.split('-');
            let opcionesMeses = Array.from(mes.options);
            let existe = false;
            let id = 0;

            while ((typeof (opcionesMeses) != "undefined") && (id <= opcionesMeses.length - 1)) {
                if (opcionesMeses[id].value == fecha[1]) {
                    existe = true;
                }
                ++id;
            }

            if (!existe) {
                var opt = document.createElement("option");
                opt.value = fecha[1];

                switch (fecha[1]) {
                    case "01":
                        opt.text = "Enero";
                        break;
                    case "02":
                        opt.text = "Febrero";
                        break;
                    case "03":
                        opt.text = "Marzo";
                        break;
                    case "04":
                        opt.text = "Abril";
                        break;
                    case "05":
                        opt.text = "Mayo";
                        break;
                    case "06":
                        opt.text = "Junio";
                        break;
                    case "07":
                        opt.text = "Julio";
                        break;
                    case "08":
                        opt.text = "Agosto";
                        break;
                    case "09":
                        opt.text = "Setiembre";
                        break;
                    case "10":
                        opt.text = "Octubre";
                        break;
                    case "11":
                        opt.text = "Noviembre";
                        break;
                    case "12":
                        opt.text = "Diciembre";
                        break;
                }
                mes.appendChild(opt);
            }

        })
    };

    const limpiar = () => {

    };
    inicializar();
})();