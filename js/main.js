//MAIN

//declaro container
const container = document.getElementById("container");
//declaro carrito de compras
let carrito = JSON.parse(localStorage.getItem("todosLosProductos")) || [];
let todosLosProductos=[];


//fetch poductos.json
fetch("./js/productos.json")
.then(response=>response.json())
.then(data=>{
  const arrayProductos=data;


arrayProductos.forEach((el,idx)=>{
    const card =document.createElement("div");
    //clase card
    card.className="card";
        card.innerHTML= `
             <h2 class="nombreProducto">${el.nombre}</h2>
             <p>$${el.precio}</p>
            
           `;
           
           
        
         container.appendChild(card);

    //imágenes producto
    const imgProducto=document.createElement("img");
    imgProducto.src=el.img;
    //clase imagen
    imgProducto.className="imagen";
    //boton para agregar productos al carrito
    const btnAdd= document.createElement("button");
    //texto boton agregar
    btnAdd.innerText="Agregar al carrito";
    //clase boton
    btnAdd.className="btn btn-primary";

    
    //evento "click" boton agregar
    btnAdd.addEventListener('click',()=>addCarrito(el.id));
    
    
    //agregar la imagen a la card
    card.appendChild(imgProducto);
    //agregar boton a la card
    card.appendChild(btnAdd);
   
    todosLosProductos.push(el);

});
});
   

    //Obtiene el boton "btnMostrarCarrito" del HTML
    const btnMostrarCarrito= document.getElementById("btnMostrarCarrito");
    btnMostrarCarrito.className="btn btn-primary";
    //Evento click sobre el boton "btnMostrarCarrito"
    btnMostrarCarrito.addEventListener("click", ()=>mostrarCarritoCompras());
    
    //Obtiene el boton "btnVaciarCarrito" del HTML
    const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
    btnVaciarCarrito.className="btn btn-secondary";
    //Evento click sobre el boton "btnVaciarCarrito"
    btnVaciarCarrito.addEventListener("click", ()=>vaciarCarritoCompras());

//función para agregar productos al carrito de compras

    function addCarrito(id) {
    
        const productoAAgregar = todosLosProductos.find(el => el.id === id);
     
        if (!carrito.some(el => el.id === id)) {
            carrito.push({
                ...productoAAgregar,
                cantidad: 1,
            });
        } else {
            let indiceDelProducto = carrito.findIndex(el => el.id === id);
            carrito[indiceDelProducto].cantidad += 1;
        };
     
        Toastify({
            text: `Agregaste ${productoAAgregar.nombre} al carrito`,
            duration: 2000,
           
        }).showToast();
    };
    
      
    //función para mostrar los productos del carrito de compras
    function mostrarCarritoCompras(){
 
            if(carrito.length >0){
                // Limpia el contenido actual 
                document.body.innerHTML = '';
     
                     // Crea un nuevo nombre para el carrito de compras
                let carritoDeCompras = document.createElement('h2');
                carritoDeCompras.textContent = 'Carrito - Productos Seleccionados';
                document.body.appendChild(carritoDeCompras);
         
                // Se crea una lista de compras que sirve para mostrar los productos que hay en el carrito 
                let listaDeCompras = document.createElement('ul');
         
                // Itera sobre los productos en el carrito de compras y crea elementos HTML para cada uno
                carrito.forEach(el => {
                  let compra = document.createElement('li');
                  compra.innerText= `Producto: ${el.nombre}  Categoria: ${el.categoria} Precio: $${el.precio} Cantidad: ${el.cantidad}`;
                  listaDeCompras.appendChild(compra);
                });
                //Agrega un elemento para mostrar el total de productos selecionados y calcula total
                let compraTotal= document.createElement('p');
                compraTotal.innerText=`Total Productos: $${calcularTotal()}`;
                listaDeCompras.appendChild(compraTotal);
         
                // Agrega la lista al cuerpo de la página
                document.body.appendChild(listaDeCompras);
         
                // Se crea un botón para regresar al catalogo inicial
                let botonVolver = document.createElement('button');
                botonVolver.textContent = 'Regresar al catalogo';
                botonVolver.className="btn btn-secondary"
                botonVolver.addEventListener('click', () => location.reload());
                document.body.appendChild(botonVolver);
                let botonConfirmar = document.createElement('button2');
                botonConfirmar.textContent = 'Confirmar Compra';
                botonConfirmar.className="btn btn-primary"
                botonConfirmar.addEventListener('click', () => confirmarCompra());
                document.body.appendChild(botonConfirmar);

              }else{
                Swal.fire("No tienes productos seleccionados");
              };  
            
    };

    //función para calcular el total de la compra

    function calcularTotal(){
        const totalProductos = carrito.reduce((acumulador, el) => acumulador + (el.precio * el.cantidad), 0);
        return totalProductos;
      };

    
    //función para vaciar el carrito de compras

    function vaciarCarritoCompras(){
        carrito=[];
        localStorage.setItem("todosLosProductos", JSON.stringify(carrito));
        Swal.fire("Se vacio el carrito de compras");    
     };
 
   //Funcion para confirmar compra

   function confirmarCompra(){

      Swal.fire({
        title: "Confirmar compra",
        text: `Precio Total Productos: $${calcularTotal()}` ,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Confirmar",
            text: "Compra confirmada!!!",
            icon: "success"
          });
        } 
      });
    
   };