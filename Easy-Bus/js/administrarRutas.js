(function () {

    let rutaID = {};
    let ctp = {};
    let ruta = {};
    let provincia = {};
    let canton = {};
    let costo = {};

    let tempID = {};

    const inicializar = () => {
        ctp = document.querySelector('#ctp');
        ruta = document.querySelector('#ruta');
        provincia = document.querySelector('#provincia');
        canton = document.querySelector('#canton');
        costo = document.querySelector('#costo');
        btnAceptar.onclick = crearRuta;
        btnLimpiar.onclick = limpiarDatos;
        bind();
        tabla();
    };

    const bind = () => {
        ctp.onchange = infoTarget;
        ruta.onchange = infoTarget;
        provincia.onchange = infoTarget;
        canton.onchange = infoTarget;
        costo.onchange = infoTarget;
    };
    
    const infoTarget = (e) => {
        const { name, value } = e.target;
        //console.log(name, ':', value)
        rutas[name] = value;
    };

    const crearRuta = () => {
        rutas['rutaID'] = listaRutas.length + 1;

        if (btnAceptar.innerHTML === "Aceptar") {
            listaRutas.push(Object.assign({}, rutas));
        } else {
            btnAceptar.innerHTML = "Aceptar"
            listaRutas[tempID].ctp = ctp.value;
            listaRutas[tempID].ruta = ruta.value;
            listaRutas[tempID].provincia = provincia.value;
            listaRutas[tempID].canton = canton.value;
            listaRutas[tempID].costo = costo.value;
            tempID = -1;
        }

        tabla();
        limpiarDatos();
    };

    const limpiarDatos = () => {
        ctp.value = '';
        ruta.value = '';
        provincia.value = 'Seleccione una opcion';
        canton.value = '';
        costo.value = '';
    };

    const tabla = () => {
        let tbAdminRuta = document.querySelector('#tbRuta');
        tbAdminRuta.innerHTML = '';

        listaRutas.forEach((rutas) => {
            let provincia = "";

            if (rutas.provincia == 0) {
                provincia = 'San Jose';
            } else if (rutas.provincia == 1) {
                provincia = 'Heredia';
            } else if (rutas.provincia == 2) {
                provincia = 'Alajuela';
            } else if (rutas.provincia == 3) {
                provincia = 'Cartago';
            } else if (rutas.provincia == 4) {
                provincia = 'Guanacaste';
            } else if (rutas.provincia == 5) {
                provincia = 'Puntarenas';
            } else {
                provincia = 'Limon';
            }


            tbAdminRuta.innerHTML += `<tr>
            <td>${rutas.rutaID}</td>
            <td>${rutas.ctp}</td>
            <td>${rutas.ruta}</td>
            <td>${rutas.provincia}</td>
            <td>${rutas.canton}</td>
            <td>${rutas.costo}</td>
            <td>

            <button 
            data-id="${rutas.rutaID}" 
            class="btn btnEditar">
            Editar</button>

            <button 
            data-id="${rutas.rutaID}" 
            class="btn btn-default bg-light border btnEliminar">
            Eliminar</button>
            </td>

            </tr>`;
        });

        let controlesEditar = document.getElementsByClassName("btnEditar");
        let controlesEliminar = document.getElementsByClassName("btnEliminar");

        for (var i = 0; i < listaRutas.length; ++i) {
            controlesEditar[i].onclick = editarRuta;
            controlesEliminar[i].onclick = eliminarRuta;
        }

    };

    const editarRuta = (e) => {
        let btnEditar = e.target;
        let id = parseInt(btnEditar.dataset.id);
        tempID = id - 1;
        let route = buscarRuta(id);

        ctp.value = route["ctp"];
        ruta.value = route["ruta"];
        provincia.value = route["provincia"];
        canton.value = route["canton"];
        costo.value = route["costo"];

        if (rutas.provincia == 0) {
            provincia.value = 'San Jose';
        } else if (rutas.provincia == 1) {
            provincia.value = 'Heredia';
        } else if (rutas.provincia == 2) {
            provincia.value = 'Alajuela';
        } else if (rutas.provincia == 3) {
            provincia.value = 'Cartago';
        } else if (rutas.provincia == 4) {
            provincia.value = 'Guanacaste';
        } else if (rutas.provincia == 5) {
            provincia.value = 'Puntarenas';
        } else {
            rolID.value = 'Limon';
        }

        btnAceptar.innerHTML = "Modificar";
    };



    const eliminarRuta = (e) => {
        let btnEliminar = e.target;
        let id = parseInt(btnEliminar.dataset.id);
        let pos = id - 1;
    
        listaRutas.splice(pos, 1);
    
        limpiarDatos();
        tabla();
    };

    inicializar();

})();