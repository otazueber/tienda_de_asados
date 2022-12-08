const formulario = document.querySelector("form"),
    nombre = document.getElementById("nombre"),
    apellido = document.getElementById("apellido"),
    email = document.getElementById("email"),
    password = document.getElementById("password");

let mensaje = document.getElementById("mensaje");

function CrearCuenta() {
    if ((nombre.value == "") || (apellido.value == "") || (email.value == "") || (password.value == "")) {

        if (nombre.value == "") {
            mensaje.innerText = "El nombre es un dato obligatorio";
        } else if (apellido.value == "") {
            mensaje.innerText = "El apellido es un dato obligatorio";
        } else if (email.value == "") {
            mensaje.innerText = "El e-mail es un dato obligatorio";
        } else if (password.value == "") {
            mensaje.innerText = "La contraseña es un dato obligatorio";
        }
        return false;

    } else {
        mensaje.innerText = "";
        return true;
    }
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (CrearCuenta()) {
        let credenciales = { mail: email.value, pass: password.value };
        sessionStorage.setItem('credenciales', JSON.stringify(credenciales));
        window.location.assign("../index.html");
    }
});