//VARIABLES
const inventario = document.getElementById('inventario')
const contenidoCarritoCompras = document.getElementById('contenido-carrito-compras')
const listaCarrito = document.querySelector('#lista-carrito-compras tbody')
const btn_vaciarCarrito = document.getElementById('vaciar-carrito')
let librosSeleccionados = []

const eventosGenerales = document.addEventListener("DOMContentLoaded", () => {
    //Carga del inventario de libros
    stockLibros();
})

//FUNCIONES
cargarEventos()
function cargarEventos(){
    inventario.addEventListener('click', agregarLibro)
    contenidoCarritoCompras.addEventListener('click', eliminarLibro)
    btn_vaciarCarrito.addEventListener('click', vaciarCarrito)
}

function stockLibros(){
    stockBooks.forEach(element => {

        const stockLibreria = document.createElement('div')
        const libroHTML = document.createElement('div')
        const {id, portada, titulo, autor, precio} = element

        stockLibreria.classList.add('col-6', 'col-md-2')
        libroHTML.classList.add('card', 'mb-4')


        libroHTML.innerHTML = `
            <img src="${portada}" alt="${titulo}" class="card-img-top"/>
            <div class="card-body px-0 py-3">
            
                <h5 class="card-title mb-0" title="${titulo}">${titulo}</h5>
                <h6 class="card-subtitle my-1"><small>${autor}</small></h6>
                <h6 class="precio mt-2 mb-3">${precio}</h6>
                <div class="d-grid gap-2">
                    <button class="btn btn-sm btn-outline-primary">
                       Ver detalle
                    </button>
                    <button class="agregar-libro btn btn-sm btn-primary" data-id="${id}">
                        Añadir al carrito
                    </button>
                </div>

            </div>
        
        `

        stockLibreria.appendChild(libroHTML)
        inventario.appendChild(stockLibreria)
    });
}

function agregarLibro(e){
    if(e.target.classList.contains('agregar-libro')){

        //Almacenamos el libro seleccionado
        const libroSeleccionado = e.target.parentElement.parentElement.parentElement
    
        //Creamos y ejecutamos la función leerDatosLibro() y le pasamos por parámetro libroSeleccionado
        leerDatosLibro(libroSeleccionado)
    }
}

function leerDatosLibro(libroSeleccionado){
    
    //Almaceno los datos del libro
    const datosLibroSeleccionado = {
        id: libroSeleccionado.querySelector('.agregar-libro').getAttribute('data-id'),
        portada: libroSeleccionado.querySelector('img').src,
        titulo: libroSeleccionado.querySelector('.card-title').textContent,
        autor: libroSeleccionado.querySelector('.card-subtitle').textContent,
        precio: libroSeleccionado.querySelector('.precio').textContent,
        cantidad: 1
    }

    const libroExistenteCarrito = librosSeleccionados.some(libro => libro.id === datosLibroSeleccionado.id)

    if(libroExistenteCarrito){
        const cantidades = librosSeleccionados.map(libro => {
            if(libro.id === datosLibroSeleccionado.id){
                libro.cantidad ++
                return libro
            }else{
                return libro
            }
        })
        librosSeleccionados = [...librosSeleccionados]
    }else{
        //Cargo el libro seleccionado en nuestro arreglo de librosSeleccionados
        librosSeleccionados = [...librosSeleccionados, datosLibroSeleccionado]
    }
    librosDentroCarrito();
}

function librosDentroCarrito(){

    limpiarElementosCarrito()
    
    librosSeleccionados.forEach(libro => {
        
        const {id, portada, titulo, cantidad, precio} = libro

        const libroSeleccionado = document.createElement('tr')
        libroSeleccionado.innerHTML = `

            <td class="portada"><img src="${portada}"/></td>
            <td class="titulo">${titulo}</td>
            <td class="precio">${precio}</td>
            <td class="cantidad">${cantidad}</td>
            <td>
                <a href="#" class="eliminar-libro" data-id="${id}"></a>
            </td>
        
        `
        listaCarrito.appendChild(libroSeleccionado)
    })  

}

function limpiarElementosCarrito(){

    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild)
    }

}

function eliminarLibro(e){
    
    if(e.target.classList.contains('eliminar-libro')){
        const libroID = e.target.getAttribute('data-id')
        librosSeleccionados = librosSeleccionados.filter(libro => libro.id !== libroID)
        librosDentroCarrito()
    }

}

function vaciarCarrito(){
    librosSeleccionados = []
    limpiarElementosCarrito()
}