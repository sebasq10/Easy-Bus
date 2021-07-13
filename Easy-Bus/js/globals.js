const listaUsuario = [];

const usuario = {
    usuarioID: 0,
    usn: "",
    contrasenia: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    rolID: 0,
    metodoPagoID: "",
    activo: ""
};



const buscarUsuario = (id) => {
    let userIndex = listaUsuario.findIndex((usuario) => usuario.usuarioID === id);
    return (userIndex !== -1) ? listaUsuario[userIndex] : null;
};

const buscarUserName = (usn) => {
    let userIndex = listaUsuario.findIndex((usuario) => usuario.usn === usn);
    return (userIndex !== -1) ? listaUsuario[userIndex] : null;
};

const buscarCorreo = (correo) => {
    let userIndex = listaUsuario.findIndex((usuario) => usuario.correo === correo);
    return (userIndex !== -1) ? listaUsuario[userIndex] : null;
};
const listaRutas = [];

const rutas = {
    rutaID: 0,
    ctp: "",
    ruta: "",
    provincia: 0,
    canton: "",
    costo: "",
};

const buscarRuta = (id) => {
    let rutaIndex = listaRutas.findIndex((rutas) => rutas.rutaID === id);
    return (rutaIndex !== -1) ? listaRutas[rutaIndex] : null;
};

const buscarCtp = (ctp) => {
    let rutaIndex = listaRutas.findIndex((rutas) => rutas.ctp === ctp);
    return (rutaIndex !== -1) ? listaRutas[rutaIndex] : null;
};