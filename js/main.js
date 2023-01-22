//Arrays con productos
const productos = [
    // Bebidas
    {
        id: "bebida-01",
        titulo: "Bebida 01",
        imagen: "./img/Bebidas/cervezas/c-gauther.jpg",
        categoria: {
            nombre: "Bebidas",
            id: "bebidas",
        },
        precio: 559
    },

    {
        id: "bebida-02",
        titulo: "Bebida 02",
        imagen: "./img/Bebidas/cervezas/c-straus.jpg",
        categoria: {
            nombre: "Bebidas",
            id: "bebidas",
        },
        precio: 581
    },

    {
        id: "bebida-03",
        titulo: "Bebida 03",
        imagen: "./img/Bebidas/fernet/f-rasante.jpg",
        categoria: {
            nombre: "Bebidas",
            id: "bebidas",
        },
        precio: 2000
    },

    {
        id: "bebida-04",
        titulo: "Bebida 04",
        imagen: "./img/Bebidas/sidra/s-pehunia.jpg",
        categoria: {
            nombre: "Bebidas",
            id: "bebidas",
        },
        precio: 880
    },

    {
        id: "bebida-05",
        titulo: "Bebida 05",
        imagen: "./img/Bebidas/vino/v-ananias.jpg",
        categoria: {
            nombre: "Bebidas",
            id: "bebidas",
        },
        precio: 1000
    },

    //Caseros
    {
        id: "caseros-01",
        titulo: "Caseros 01",
        imagen: "./img/Caseros/bizcochuelo.jpg",
        categoria: {
            nombre: "Caseros",
            id: "caseros",
        },
        precio: 990
    },

    {
        id: "caseros-02",
        titulo: "Caseros 02",
        imagen: "./img/Caseros/galletas.jpg",
        categoria: {
            nombre: "Caseros",
            id: "caseros",
        },
        precio: 655
    },

    {
        id: "caseros-03",
        titulo: "Caseros 03",
        imagen: "./img/Caseros/pizza.jpg",
        categoria: {
            nombre: "Caseros",
            id: "caseros",
        },
        precio: 359
    },

    //Comida
    {
        id: "comida-01",
        titulo: "Comida 01",
        imagen: "./img/Comida/arroz.jpg",
        categoria: {
            nombre: "Comida",
            id: "comida",
        },
        precio: 280
    },

    {
        id: "comida 02",
        titulo: "Comida-02",
        imagen: "./img/Comida/cereal-havana.jpg",
        categoria: {
            nombre: "Comida",
            id: "comida",
        },
        precio: 300
    },

    {
        id: "comida-03",
        titulo: "Comida 03",
        imagen: "./img/Comida/chocolate.jpg",
        categoria: {
            nombre: "Comida",
            id: "comida",
        },
        precio: 415
    },

    {
        id: "comida-04",
        titulo: "Comida 04",
        imagen: "./img/Comida/empanadas.jpg",
        categoria: {
            nombre: "Comida",
            id: "comida",
        },
        precio: 1500
    },
]

//Elementos del DOM y variables
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector(".titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito")

//Conectar base JSON
// const productos = fetch("/data.json")
// .then((res) => res.json())
// .then((data) => {console.log(res)});
// Promise.all([productos]).then((data) => console.log(productos));

// Pintar en el DOM
function cargarProductos(productosElegidos) {

    //vaciar el html de los productos
    contenedorProductos.innerHTML = "",

        productosElegidos.forEach(producto => {

            const div = document.createElement("div")
            div.classList.add("producto");
            div.innerHTML = `
    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}" >AGREGAR</button>
                    </div>
                   
    `;

            contenedorProductos.appendChild(div);

        })
    actualizarBotonesAgregar();

}

//Llamar función
cargarProductos(productos)

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        //Marcar active en el navbar
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        //condición para mostrar el array
        if (e.currentTarget.id != "todos") {

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerHTML = productoCategoria.categoria.nombre
            //Filter para mostrar productos de la categoria seleccionada
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)

            //llamar función para que muestre productos
            cargarProductos(productosBoton)

        } else {
            tituloPrincipal.innerHTML = "Todos los productos"
            cargarProductos(productos)
        }

    })
})

//Boton agregar
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

//Verificar si tiene productos el carrito
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

//Agregar al array del carrito
function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    //Metodo de busqueda
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    //Verificar si está en el carrito y sumar cantidad
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {

        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++;
    } else {

        productoAgregado.cantidad = 1;
        //Push al carrito
        productosEnCarrito.push(productoAgregado)
    }

    //Llamar función número carrito
    actualizarNumerito()

    //Guardar en el LocalStore
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

}

//función actualizar número carrito

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerHTML = nuevoNumerito
}


