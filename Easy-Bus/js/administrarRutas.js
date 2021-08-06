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
        rutas[name] = value;
    };

    const crearRuta = async () => {
        //rutas['rutaID'] = listaRutas.length + 1;
        document.getElementById('btnLimpiar').style.visibility = 'visible';
        
        if (btnAceptar.innerHTML === "Aceptar") {
            let rutaTemp = listaRutas.find(rt => rt.CTP == ctp.value);
            if (typeof(rutaTemp) != "undefined"){
                window.alert("El CTP ya existe. Utilice otro.");
                return;
            }
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

            let rutas = listaRutas.find((x) => x._id == tempID);

            rutas.CTP = ctp.value;
            rutas.nombreRuta = ruta.value;
            rutas.provincia = provincia.value;
            rutas.canton = canton.value;
            rutas.precio = costo.value;
            btnAceptar.innerHTML = "Aceptar";

            fetch(`${url}/rutas/${tempID}`, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(rutas),
            })
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
        }

        tempID = "";
        await fetchRutas();
        tabla();
        limpiarDatos();
        location.reload();
    };

    const limpiarDatos = () => {
        btnAceptar.innerHTML = "Aceptar";
        ctp.value = '';
        ruta.value = '';
        provincia.value = 'Seleccione una opcion';
        canton.value = '';
        costo.value = '';
        tabla();
    };

    const tabla = () => {
        let tbAdminRuta = document.querySelector('#tbRuta');
        tbAdminRuta.innerHTML = '';

        let controlesEditar = document.getElementsByClassName("btnEditar");
        let controlesEliminar = document.getElementsByClassName("btnEliminar");

        listaRutas.forEach((rutas) => {

            tbAdminRuta.innerHTML += `<tr>
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
        document.getElementById('btnLimpiar').style.visibility = 'hidden';
        tabla();
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
        location.reload();
    };
    inicializar();
})();