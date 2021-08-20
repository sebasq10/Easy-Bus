(function () {

    let fechaIngreso = {};
    let cantidadIngreso = {};


    const inicializar = async () => {
        fechaIngreso = document.querySelector('#fechaIngreso');
        cantidadIngreso = document.querySelector('#cantidadIngreso');

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

    inicializar();
})();