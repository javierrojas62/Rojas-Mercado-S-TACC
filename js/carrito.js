let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

//Elementos del DOM
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disable");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disable");
        contenedorCarritoComprado.classList.add("disable");

        contenedorCarritoProductos.innerHTML = "";

        //mostrar productos
        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
        
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito-producto-titulo">
            <small>Título</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>$${producto.precio * producto.cantidad}</p>
        </div>

        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
        
        `;

            contenedorCarritoProductos.append(div)

        })

        actualizarBotonesEliminar()
        actualizarTotal();


    } else {

        contenedorCarritoVacio.classList.remove("disable");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disable");
        contenedorCarritoComprado.classList.add("disable");

    }


}

cargarProductosCarrito()



//función boton Eliminar
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}


//Boton vaciar carrito
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

//Actualizar total
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

//Boton comprar
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}