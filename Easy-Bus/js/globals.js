let listaUsuarios = [];
let listaRutas = [];
let listaRoles = [];
let listaMonederos = [];
const usuario = {};
const rutas = {};

const url = `http://localhost:5000`;

/**
 * Duerme los hilos
 * @param {D} mili milisegundos
 * @returns promesa que espera.
 */
const sleep = (mili) => {
    return new Promise((resultado) => setTimeout(resultado, mili));
};

/**
 * Hace fetch a las bases de datos y lo guarda en el arreglo correspondiente
 */
const fetchUsuarios = async () => {
    let datos = await fetch(`${url}/usuarios`)
        .then((response) => response.json());
    listaUsuarios = datos;
};

const fetchRoles = async () => {
    let datos = await fetch(`${url}/roles`)
        .then((response) => response.json());
    listaRoles = datos;
};

const fetchRutas = async () => {
    let datos = await fetch(`${url}/rutas`)
        .then((response) => response.json());

    listaRutas = datos;
};

const fetchMonederos = async () => {
    let datos = await fetch(`${url}/monederos`)
        .then((response) => response.json());

    listaMonederos = datos;
};

const getById = async (tabla, id) => {
    await sleep(5000);
    let datos = "";

    await fetch(`${url}/${tabla}/${id}`)
        .then((response) => response.json())
        .then((id) => datos = id);

    return datos;
};

const buscarUsuario = (id) => {
    let userIndex = listaUsuarios.findIndex((usuario) => usuario.usuarioID === id);
    return (userIndex !== -1) ? listaUsuarios[userIndex] : null;
};

const buscarUserName = (usn) => {
    let userIndex = listaUsuarios.findIndex((usuario) => usuario.usn === usn);
    return (userIndex !== -1) ? listaUsuarios[userIndex] : null;
};

const buscarCorreo = (correo) => {
    let userIndex = listaUsuarios.findIndex((usuario) => usuario.correo === correo);
    return (userIndex !== -1) ? listaUsuarios[userIndex] : null;
};

const buscarRuta = (id) => {
    let rutaIndex = listaRutas.findIndex((rutas) => rutas.rutaID === id);
    return (rutaIndex !== -1) ? listaRutas[rutaIndex] : null;
};

const buscarCtp = (ctp) => {
    let rutaIndex = listaRutas.findIndex((rutas) => rutas.ctp === ctp);
    return (rutaIndex !== -1) ? listaRutas[rutaIndex] : null;
};