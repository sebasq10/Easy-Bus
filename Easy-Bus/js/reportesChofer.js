(function () {

    let fechaIngreso = {};
    let cantidadIngreso = {};


    const inicializar = async () => {
        fechaIngreso = document.querySelector('#fechaIngreso');
        cantidadIngreso = document.querySelector('#cantidadIngreso');

        tabla();
        bind();
    };

    inicializar();
})();