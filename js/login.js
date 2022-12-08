const formulario = document.querySelector("form"),
    email = document.getElementById("email"),
    password = document.getElementById("password");
let mensaje = document.getElementById("mensaje");

function guardarCredenciales() {
    let credenciales = { mail: email.value, pass: password.value };
    if (credenciales.usuario == "" || credenciales.pass == "") {
        mensaje.innerText = "Correo electrónico o contraseña \n incorrectos";
        return false;
    } else {
        sessionStorage.setItem('credenciales', JSON.stringify(credenciales));
        return true;
    }
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (guardarCredenciales()) {
        window.location.assign("../index.html");
    }
}
);

let mailenviado = sessionStorage.getItem("mailEnviado");
if (mailenviado == "1") {
    sessionStorage.setItem('mailEnviado', "0");
    mensaje.innerText = "Te hemos enviado un e-mail \ncon un enlace para actualizar \ntu contraseña.";
}