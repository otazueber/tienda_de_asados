class Producto {
    constructor(idProducto, imagen, descripcion, unidadMedida, precio) {
        this.idProducto = idProducto;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.unidadMedida = unidadMedida;
        this.precio = precio;
        this.cantidad = 0;
    }
};
var productos = [];
var carrito = [];

function crearHtml(arrayProductos, contenedor, estoyMostrandoElCarrito = false) {
    let html = "";
    let contador = 0;
    let idProductoOtros = "";
    let preciosinformato = 0.0;
    let precioFormateado = "";

    if (estoyMostrandoElCarrito) {
        let cantidadProductos = arrayProductos.length + " producto";
        if (arrayProductos.length > 1) {
            cantidadProductos += "s";
        }
        html = `<div class="row">
                    <div class="col-12 col-lg-4">
                        <h1 class="p-5">Mi carrito (${cantidadProductos})</h1>
                    </div>
                    <div class="col-12 col-lg-4 pt-5 centrarElementos">
                        <a href="pago.html"><button id="btnFinalizarCompra" class="btnFinalizarCompra">Finalizar compra $ ${obtenerImporteTotal()}</button></a>
                    </div>
                </div>`;
    }
    arrayProductos.forEach((producto) => {
        const { idProducto, imagen, descripcion, unidadMedida, precio, cantidad } = producto;
        preciosinformato = parseFloat(precio);
        precioFormateado = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(preciosinformato)
        if (!estoyMostrandoElCarrito) {
            idProductoOtros = `id="${idProducto}"`;
        }
        contador++;
        if (contador == 1) {
            html = html + '<div class="row row-producto">';
        }
        html = html + ` <div class="col-12 col-lg-3 box_producto pt-5">
                            <img class="producto ps-5" src="${imagen}" alt="Photo">
                            <p>${descripcion}<br>Precio por ${unidadMedida}: ${precioFormateado}</p>`;
        if (estoyMostrandoElCarrito) {
            html += `<p id="p${idProducto}">Cantidad: ${cantidad}</p> 
                    <img id="${idProducto * -1}" class="btn-administrar" src="../assets/img/btnResta.png" alt="Icon">
                    <img id="${idProducto}" class="btn-administrar" src="../assets/img/btnSuma.png" alt="Icon">
                    <img id="${idProducto * 10000}" class="btn-administrar" src="../assets/img/btnEliminar.png" alt="Icon">`;
        }
        else {
            html += `<div class="centrarElementos"><button ${idProductoOtros} class="btnAgregarProducto"><img src="../assets/img/agregar.png"/>Agregar</button></div>`;
        }
        html = html + ` </div>`;
        if (contador == 4) {
            html += '</div>';
            contador = 0;
        }
    }
    );
    if (contador < 4) {
        html += '</div>';
    }
    contenedor.innerHTML = html;
    if (estoyMostrandoElCarrito) {
        asignarEventoABotonesDelCarrito();
    }
    else {
        asignarEventoAgregarAlCarrito();
    }
}

function obtenerImporteTotal() {
    importe = 0;
    carrito.forEach((producto) => {
        const { precio, cantidad } = producto;
        importe += precio * cantidad;
    });
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(importe)
}
async function obtenerYCargarProductos() {
    var response;
    var vacunos = [];
    var vinos = [];
    var almacen = [];

    response = await fetch("../assets/json/vacunos.json");
    vacunos = await response.json();
    productos = productos.concat(vacunos);

    response = await fetch("../assets/json/vinos.json");
    vinos = await response.json();
    productos = productos.concat(vinos);

    response = await fetch("../assets/json/almacen.json");
    almacen = await response.json();
    productos = productos.concat(almacen);

    let contenedor = document.getElementById("productos-vacunos");
    if (contenedor != null) {
        crearHtml(vacunos, contenedor);
    }
    contenedor = document.getElementById("productos-vinos");
    if (contenedor != null) {
        crearHtml(vinos, contenedor);
    }
    contenedor = document.getElementById("productos-almacen");
    if (contenedor != null) {
        crearHtml(almacen, contenedor);
    }
}

function leerCarrito() {
    let jsonCarrito = localStorage.getItem("carrito");
    if (jsonCarrito != null) {
        carrito = JSON.parse(jsonCarrito);
    }
}

leerCarrito();

obtenerYCargarProductos()

let person = document.getElementById("person");
let usuarioLogueado = false;
const htmlUsuarioNoLogueado = '<a href="pages/login.html"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16"><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" /></svg></a>';
const htmlUsuarioLogueado = '<a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-fill-dash" viewBox="0 0 16 16"><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/></svg></a>';

function leerCredenciales() {
    let usuario = JSON.parse(sessionStorage.getItem("credenciales"));

    if (usuario == null) {
        person.innerHTML = htmlUsuarioNoLogueado;
    } else {
        person.innerHTML = htmlUsuarioLogueado;
        usuarioLogueado = true;
    }
}

leerCredenciales();

function obtenerRuta() {
    var rutaAbsoluta = self.location.href;
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var archivoHtml = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length - 5);
    if (archivoHtml == "index") {
        return "pages/";
    }
    else {
        return "";
    }
}

function loguearDeslogearse() {
    if (usuarioLogueado) {
        sessionStorage.clear();
        person.innerHTML = htmlUsuarioNoLogueado;
        usuarioLogueado = false;
    } else {
        window.location.assign(obtenerRuta() + "login.html");
    }
}

person.addEventListener("click", (e) => {
    e.preventDefault();
    loguearDeslogearse();
}
);

function linkearCarrito() {
    var carrito = document.getElementById("carrito");
    if (carrito != null) {
        carrito.href = obtenerRuta() + "carrito.html";
    }
}

linkearCarrito();

function encontrar(arr, id) {
    return arr.find(el => el.idProducto == id);
}

function grabarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function agregarAlCarrito(id) {
    if (parseInt(id) > 0) {
        let productoEncontrado = encontrar(carrito, id);
        if (productoEncontrado == undefined) {
            carrito.push(encontrar(productos, id));
            actualizarCantidadEnCarrito();
        }
        else {
            productoEncontrado.cantidad++;
        }
        grabarCarritoEnLocalStorage();
        mostrarMensajeProductoAgregado();
    }
}

function mostrarMensajeProductoAgregado() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })

    Toast.fire({
        icon: 'success',
        title: 'Producto agregado exitosamente al carrito'
    })
}

function asignarEventoAgregarAlCarrito() {
    const botones = document.getElementsByClassName("btnAgregarProducto");
    for (let boton of botones) {
        boton.addEventListener("click", (e) => {
            agregarAlCarrito(e.target.id);
        })
    }
};

function asignarEventoABotonesDelCarrito() {
    const botones = document.getElementsByClassName("btn-administrar");
    for (let boton of botones) {
        boton.addEventListener("click", (e) => {
            administrarCarrito(e.target.id, e.target.classname);
        })
    }
};

function administrarCarrito(id, classname) {
    if (parseInt(id) < 0) {
        restarProducto(id * -1)
    }
    if ((parseInt(id) > 0) & (parseInt(id) < 10000)) {
        sumarProducto(id)
    }
    if (parseInt(id) > 10000) {
        eliminarProducto(id / 10000)
    }
    grabarCarritoEnLocalStorage();
}

function mostrarNuevaCantidad(id, cantidad) {
    let element = document.getElementById("p" + id);
    element.innerText = "Cantidad: " + cantidad;
}

function restarProducto(id) {
    let productoEncontrado = encontrar(carrito, id);
    productoEncontrado.cantidad--;
    if (productoEncontrado.cantidad == 0) {
        eliminarProducto(id);
    }
    else {
        mostrarNuevaCantidad(id, productoEncontrado.cantidad);
        grabarCarritoEnLocalStorage();
        actualizarBotonFinalizarCompra();
    }
}

function sumarProducto(id) {
    let productoEncontrado = encontrar(carrito, id);
    productoEncontrado.cantidad++;
    mostrarNuevaCantidad(id, productoEncontrado.cantidad);
    grabarCarritoEnLocalStorage();
    actualizarBotonFinalizarCompra();
}

function eliminarProducto(id) {
    carrito = carrito.filter(producto => producto.idProducto != id);
    grabarCarritoEnLocalStorage();
    mostrarCarrito();
}

function actualizarCantidadEnCarrito() {
    const span = document.getElementById('cart-count');
    if (span != null) {
        if (carrito.length == 0) {
            span.textContent = "";
        }
        else {
            span.textContent = carrito.length;
        }
    }
}

actualizarCantidadEnCarrito();

function mostrarCarrito() {
    if (carrito.length == 0) {
        let contenedor = document.getElementById("productos");
        if (contenedor != null) {
            contenedor.innerHTML = `<div class="centrarElementos">
                                        <img src="../assets/img/carrito.png" alt="Carrito">
                                    </div>
                                    <div class="centrarElementos">
                                        <h1 class="py-5">Tu carrito está vacío</h1>
                                    </div>
                                    <div class="centrarElementos">
                                        <p>Aún no tenes artículos en tu carrito de compra.</p>
                                    </div>
                                    <div class="centrarElementos">
                                        <a href="../index.html">
                                        <button>Seguir navegando</button></a>
                                    </div><br><br><br><br><br><br><br>`;

        }
    }
    else {
        let contenedor = document.getElementById("productos");
        if (contenedor != null) {
            crearHtml(carrito, contenedor, true);
        }
    }
}

mostrarCarrito();

function actualizarBotonFinalizarCompra(){
    let btn = document.getElementById("btnFinalizarCompra");
    if (btn != null) {
        btn.innerText = "Finalizar compra $ " + obtenerImporteTotal();
    }
}

function administrarPaginaDePago() {
    let botonPagar = document.getElementById("btnPagar");
    if (botonPagar != null) {
        botonPagar.innerText = "Pagar " + obtenerImporteTotal();
        botonPagar.addEventListener("click", (e) => {
            e.preventDefault();
            realizarPago();
        })
    }
}

administrarPaginaDePago();

function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

function asignarEventoSoloNumeros() {
    let inputs = document.getElementsByClassName("solo_numeros");
    for (let input of inputs) {
        setInputFilter(input, function (value) {
            return /^-?\d*$/.test(value);
        }, "Debe ingresar sólo números");
    }
}

asignarEventoSoloNumeros();

function sacarError(input) {
    input.classList.remove("input-error");
    input.setCustomValidity("");
} 

function asignarEventoQueQuitaErrores() {
    let inputs = document.getElementsByClassName("sacar_error");
    for (let input of inputs) {
        input.addEventListener("keydown", () => {
            sacarError(input);
        }
        );
    }
}

asignarEventoQueQuitaErrores();

function mostrarValidacion(elemento, mensaje) {
    elemento.classList.add("input-error");
    elemento.setCustomValidity(mensaje);
    elemento.reportValidity();
}

function realizarPago() {
    const tarjeta = document.getElementById("nroTarjeta");
    const nombre = document.getElementById("nombreCompleto");
    const vencimiento = document.getElementById("vencimiento");
    const codigo = document.getElementById("codigoSeguridad");
    const email = document.getElementById("email");
    if (tarjeta.value.length != 16) {
        mostrarValidacion(tarjeta, "El número de tarjeta es inválido");
    }
    else if (nombre.value.length == 0) {
        mostrarValidacion(nombre, "Ingrese su nombre completo");
    }
    else if (vencimiento.value.length != 4) {
        mostrarValidacion(vencimiento, "El vencimiento se inválido");
    }
    else if (codigo.value.length != 3) {
        mostrarValidacion(codigo, "El código de seguridad es inválido");
    }
    else if (email.value.length == 0) {
        mostrarValidacion(email, "Ingrese su e-mail");
    }
    else {
        carrito = [];
        actualizarCantidadEnCarrito();
        grabarCarritoEnLocalStorage();
        Swal.fire({
            position: 'center-center',
            icon: 'success',
            title: 'Pago realizado exitosamente, gracias por su compra!!!',
            showConfirmButton: false,
            timer: 3000,

        })
        sleep(3000).then(function () {
            window.location.assign("../index.html");
        });

    }
}

function sleep(time) {
    return (new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(); }, time);
    }));
}