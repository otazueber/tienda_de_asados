const formulario = document.querySelector("form"),
    email = document.getElementById("email");
let mensaje = document.getElementById("mensaje");

function EnviarMail() {
    if (email.value == "") {
        mensaje.innerText = "ingrese su e-mail";
    } else {
        sessionStorage.setItem('mailEnviado', "1");
        window.location.assign("login.html");
    }
}


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
    EnviarMail()
}
);