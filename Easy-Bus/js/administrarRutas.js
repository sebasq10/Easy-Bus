(function () {

    let ctp = {};
    let ruta = {};
    let provincia = {};
    let canton = {};
    let costo = {};

    let tempID = {};

    const inicializar = async () => {
        ctp = document.querySelector('#CTP');
        ruta = document.querySelector('#nombreRuta');
        provincia = document.querySelector('#provincia');
        canton = document.querySelector('#canton');
        costo = document.querySelector('#precio');
        btnAceptar.onclick = crearRuta;
        btnLimpiar.onclick = limpiarDatos;
        await fetchRutas();
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

    const crearRuta = async () => {
        rutas['rutaID'] = listaRutas.length + 1;

        /*  if (buscarCtp(ctp.value) !== null) {
             window.alert("El CTP ya existe. Utilice otro.");
             return;
         } */

        if (btnAceptar.innerHTML === "Aceptar") {
            fetch(`${url}/rutas`, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(rutas),
            })
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
        } else {

            let ruta = listaRutas.find((x) => x._id == tempID);

            ruta.CTP = ctp.value;
            ruta.nombreRuta = ruta.value;
            ruta.provincia = provincia.value;
            ruta.canton = canton.value;
            ruta.precio = costo.value;
            btnAceptar.innerHTML = "Aceptar";

            fetch(`${url}/rutas/${tempID}`, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(ruta),
            })
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
        }

        tempID = "";
        await fetchRutas();
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

        let controlesEditar = document.getElementsByClassName("btnEditar");
        let controlesEliminar = document.getElementsByClassName("btnEliminar");

        listaRutas.forEach((rutas) => {
            let provincia = "";

            tbAdminRuta.innerHTML += `<tr>
            <td>${rutas._id}</td>
            <td>${rutas.CTP}</td>
            <td>${rutas.nombreRuta}</td>
            <td>${rutas.provincia}</td>
            <td>${rutas.canton}</td>
            <td>${rutas.precio}</td>
            <td>

            <button 
            data-id="${rutas._id}" 
            class="btn btnEditar">
            Editar</button>

            <button 
            data-id="${rutas._id}" 
            class="btn btn-default bg-light border btnEliminar">
            Eliminar</button>
            </td>

            </tr>`;
        });

        for (var i = 0; i < listaRutas.length; ++i) {
            controlesEditar[i].onclick = editarRuta;
            controlesEliminar[i].onclick = eliminarRuta;
        }

    };

    const editarRuta = (e) => {
        let btnEditar = e.target;
        let id = btnEditar.dataset.id;
        let rutaE = listaRutas.find((rutaid) => rutaid._id == id);
        tempID = rutaE._id;

        ctp.value = rutaE["CTP"];
        ruta.value = rutaE["nombreRuta"];
        provincia.value = rutaE["provincia"];
        canton.value = rutaE["canton"];
        costo.value = rutaE["precio"];
        provincia.value = rutaE.provincia;

        btnAceptar.innerHTML = "Modificar";
    };

    const eliminarRuta = async (e) => {
        let btnEliminar = e.target;
        let id = btnEliminar.dataset.id;
        let rutaE = listaRutas.find((rutaid) => rutaid._id == id);

        fetch(`${url}/rutas/${rutaE._id}`, {
            method: "DELETE"
        })
            .then((res) => console.log(res))
            .catch((error) => console.log(error));

        await fetchRutas();
        limpiarDatos();
        tabla();
    };

    inicializar();

})();