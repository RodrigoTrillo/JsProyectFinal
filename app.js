//modal


let productos = [
    {id:1 ,nombre:"teclado 1" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:4300 , img: "./images/tec1.jpg" },
    {id:2 ,nombre:"teclado 2" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:4500 , img: "./images/tec2.jpg" },
    {id:3 ,nombre:"teclado 3" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:5500 , img: "./images/tec3.jpg" },
    {id:4 ,nombre:"teclado 4" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:5700 , img: "./images/tec4.jpg" },
    {id:5 ,nombre:"teclado 5" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:11000, img: "./images/tec5.jpg" },
    {id:6 ,nombre:"teclado 6" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:11700, img: "./images/tec6.jpg" },
    {id:7 ,nombre:"teclado 7" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:9000 , img: "./images/tec7.jpg" },
    {id:8 ,nombre:"teclado 8" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:9500 , img: "./images/tec8.jpg" },
    {id:9 ,nombre:"teclado 9" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:9700 , img: "./images/tec9.jpg" },
    {id:10 ,nombre:"teclado 10" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:9800 , img: "./images/tec10.jpg" },
    {id:11 ,nombre:"teclado 11" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:7200 , img: "./images/tec11.jpg" },
    {id:12 ,nombre:"teclado 12" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:5200 , img: "./images/tec12.jpg" },
    {id:13 ,nombre:"teclado 13" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:4500 , img: "./images/tec13.jpg" },
    {id:14 ,nombre:"teclado 14" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:5800 , img: "./images/tec14.jpg" },
    {id:15 ,nombre:"teclado 15" ,tipo:"teclado" , cantidad:1 , descripcion:"Teclado Gamer" , precio:7500 , img: "./images/tec15.jpg" },
]


const contenedorProductos= document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonVaciar = document.getElementById("vacias-carrito")

const contadorCarrito = document.getElementById("contadorCarrito")


const precioTotal = document.getElementById("precioTotal")

let carrito =[]


// cambiando a ternario

document.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem('carrito')? (carrito = JSON.parse(localStorage.getItem('carrito')), actualizarCarrito()): null
    })
/* document.addEventListener("DOMContentLoaded",()=>{
    if (localStorage.getItem("carrito")){
        carrito= JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito()
    }
}) */


botonVaciar.addEventListener(`click`, ()=>{
    carrito.length= 0
    actualizarCarrito()
})


productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto")
    div.innerHTML=`
    <img src=${producto.img} class="imagen">
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <p class="precioProducto">${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar<i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`)
    
    boton.addEventListener("click", ()=>{
        agregarCarrito(producto.id)
    })
   
})
 


const agregarCarrito = (prodId)=>{
    const existe = carrito.some (prod =>prod.id === prodId)
    let prod;
    let item;
    existe? (prod = carrito.map(prod=>{
        if (prod.id === prodId)
            prod.cantidad++
    })):(item = productos.find ((prod)=> prod.id === prodId), carrito.push(item))
    actualizarCarrito()
    console.log(carrito)
}

const eliminarDelCarrito=(prodId)=>{
    const item = carrito.find((prod)=> prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

const actualizarCarrito = () =>{
    contenedorCarrito.innerHTML=""
    carrito.forEach((prod)=>{
        const div = document.createElement("div");
        div.className=("productoCarrito")
        div.innerHTML= `
        <p class="prodTitle">${prod.nombre}</p>
        <p class="prodPrecio">Precio: ${prod.precio}</p>
        <p class="prodCantidad">Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-elminar btn-close"></button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem("carrito", JSON.stringify(carrito))
    })
    contadorCarrito.innerHTML=carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.precio, 0)
}