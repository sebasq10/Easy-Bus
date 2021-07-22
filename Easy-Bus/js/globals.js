let listaUsuarios = [];
let listaRutas = [];
let listaRoles = [];

const url = `http://localhost:5000`;

const usuario = {};
const rutas = {};

const sleep = (mili) => {
    return new Promise((resultado) => setTimeout(resultado, mili));
};

/**
 * Hace fetch a las bases de datos y lo guarda en el arreglo correspondiente
 */
const getBases = async () => {

    let datos = await fetch(`${url}/usuarios`)
        .then((response) => response.json());
    listaUsuarios = datos;

    datos = await fetch(`${url}/roles`)
        .then((response) => response.json());

    listaRoles = datos;
};


const getById = async (tabla, id) => {
    await sleep(5000);
    let datos = "";

    await fetch(`${url}/${tabla}/${id}`)
        .then((response) => response.json())
        .then((id) => datos = id);

    return datos;
};

/* const buscarUsuario = (id) => {
    let userIndex = listaUsuarios.findIndex((usuario) => usuario.usuarioID === id);
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

const buscarRuta = (id) => {
    let rutaIndex = listaRutas.findIndex((rutas) => rutas.rutaID === id);
    return (rutaIndex !== -1) ? listaRutas[rutaIndex] : null;
};

const buscarCtp = (ctp) => {
    let rutaIndex = listaRutas.findIndex((rutas) => rutas.ctp === ctp);
    return (rutaIndex !== -1) ? listaRutas[rutaIndex] : null;
};*/