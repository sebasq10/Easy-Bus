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
    return listaUsuario[userIndex];
};