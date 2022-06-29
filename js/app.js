//VARIABLES
const inventario = document.getElementById('inventario')
const contenidoCarritoCompras = document.getElementById('contenido-carrito-compras')
const listaCarrito = document.querySelector('#lista-carrito-compras tbody')
const btn_vaciarCarrito = document.getElementById('vaciar-carrito')
const todosGeneros = document.getElementById('todos-generos')
const tituloCategoria = document.getElementById('titulo-categoria')
const cantidadLibros = document.getElementById('cantidad-libros')
const pokemonContenedor = document.getElementById('pokemon-modal')
const btnPokemonDia = document.getElementById('btn-pokemon-del-dia')

let librosSeleccionados = []
let generosLibros = []
let cantidadLibrosAgregados = 0

const eventosGenerales = document.addEventListener("DOMContentLoaded", () => {
    stockLibros();
    leerGeneros();
    mostrarGeneros();
    cargarStorage();
})

function cargarStorage(){
    librosSeleccionados = JSON.parse(localStorage.getItem('carrito-compras') || [])
    librosDentroCarrito()
} 

todosGeneros.addEventListener('click',() => {
    stockLibros()
})

//FUNCIONES
cargarEventos()
function cargarEventos(){
    inventario.addEventListener('click', agregarLibro)
    contenidoCarritoCompras.addEventListener('click', eliminarLibro)
    btn_vaciarCarrito.addEventListener('click', vaciarCarrito)
    btnPokemonDia.addEventListener('click', fetchData)
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
    
    //Agrego al LocalStorage
    almacenarStorage();
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
    limpiarStorage()

}

function leerGeneros(){
    const generos = stockBooks.map( libro => libro.genero )
    const generosSet = new Set(generos)
    const generosUnicos = [...generosSet]

    generosLibros = generosUnicos.map( libro => {
        return{
            id: libro,
            nombre: libro
        }
    })
}

function mostrarGeneros(){
    const filtroCategorias = document.getElementById('filtro-categorias')
    generosLibros.forEach( libro => {
        const btnCategoria = document.createElement('button')
        btnCategoria.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'me-2')
        btnCategoria.innerText = libro.nombre
        
        btnCategoria.addEventListener('click', () => {
            stockLibros(libro.nombre)
            tituloCategoria.textContent = `Categoria: ${libro.nombre}`
        })

        filtroCategorias.appendChild(btnCategoria)
    })
}

function stockLibros(generoLibro = ""){

    let librosCargados = stockBooks

    if(generoLibro !== ""){
        librosCargados = stockBooks.filter( libro => libro.genero === generoLibro)
    }

    tituloCategoria.textContent = `Categoria: Todos`
    inventario.innerHTML = "";

    librosCargados.forEach(element => {

        const stockLibreria = document.createElement('div')
        const libroHTML = document.createElement('div')
        const {id, portada, titulo, autor, precio, sinopsis} = element

        stockLibreria.classList.add('col-6', 'col-md-2')
        libroHTML.classList.add('card', 'mb-4')

        libroHTML.innerHTML = `
            <img src="${portada}" alt="${titulo}" class="card-img-top"/>
            <div class="card-body px-0 py-3">
            
                <h5 class="card-title mb-0" title="${titulo}">${titulo}</h5>
                <h6 class="card-subtitle my-1"><small>${autor}</small></h6>
                <h6 class="precio mt-2 mb-3">${precio}</h6>
                <div class="d-grid gap-2">
                    <!---<button class="detalle-libro btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#detalleLibro">
                       Ver detalle
                    </button> --->
                    <button class="agregar-libro btn  btn-primary" data-id="${id}">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        `
        stockLibreria.appendChild(libroHTML)
        inventario.appendChild(stockLibreria)
    });
}

//LocalStorage

function almacenarStorage(){
    localStorage.setItem('carrito-compras', JSON.stringify(librosSeleccionados))
    localStorage.setItem('cantidad-libros-agregados', JSON.stringify(cantidadLibrosAgregados))
}

function limpiarStorage(){
    localStorage.removeItem('carrito-compras')
}

//Fetch
async function fetchData(){
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/150")
        const data = await res.json()
        console.log(data)
        pokemonDelDia(data)
    } catch (error) {
        alert(error)
    }
}

function pokemonDelDia(pokemon){
    pokemonContenedor.classList.add('modal')

    const pokemonMuestra = document.createElement('div')
    pokemonMuestra.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">

                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-body text-center">
                    <img src="${pokemon.sprites.other.dream_world.front_default}" />
                    <h2 class="modal-title">${pokemon.name}</h2>
                </div>
            </div>
        </div>
    `
    pokemonContenedor.appendChild(pokemonMuestra)
}
