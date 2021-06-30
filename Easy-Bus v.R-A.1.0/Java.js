function Login(usr,cont) {
    //Se Requiere de un query para llamar la BD para buscar el usuario y confirmar que la contraseña sea correcta
    if (usr == "admin" && cont == "admin");
    window.location.href = "usuariosAdmin.html";
}

function Salir() {
    window.location.href = "login.html";
}

function CrearCuenta(nombre,primerA,segundoA,fechaNacimiento,usuario,rol) {
    //Ocupamos conexión a base de datos, solo es meter estos datos
    console.log("Cuenta Creada");
}

function CrearRutas(cod,nombre,provincia,canton,costo) {
    //Ocupamos conexión a base de datos, solo es meter estos datos
    console.log("Ruta Creada");
}

function LimpiarUsuarios() {
    document.getElementById(nombre).value = " ";
    document.getElementById(primerA).value = " ";
}