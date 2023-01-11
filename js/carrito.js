
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorcarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorcarritoComprado = document.querySelector("#carrito-comprado");


if (productosEnCarrito) {

    contenedorCarritoVacio.classList.add("disable");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorcarritoAcciones.classList.remove("disable")
    contenedorcarritoComprado.classList.add("disable")

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
    <button class="carrito-producto-eliminar" id="${producto.id}"><iclass="bi bi-trash"></iclass=></button>
    </div>
    
    `;

        contenedorCarritoProductos.append(div)

    })



} else {

}