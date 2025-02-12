document.addEventListener("DOMContentLoaded", function () {
  // Cargar el archivo JSON
  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      const productosContainer = document.getElementById('productos-container');
      // Recorrer los productos y crear elementos HTML
      data.forEach(producto => {
        const productoHTML = `
          <div class="producto" data-id="${producto.id}">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <p><strong>Vendedor:</strong> ${producto.vendedor}</p>
            <button onclick="seleccionarProducto(${producto.id})">Detalles</button>
          </div>
        `;
        productosContainer.innerHTML += productoHTML;
      });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
});

// Función para seleccionar un producto
function seleccionarProducto(id) {
  const productos = document.querySelectorAll('.producto');
  productos.forEach(producto => {
    if (producto.dataset.id == id) {
      producto.classList.toggle('seleccionado'); // Alternar selección
    } else {
      producto.classList.remove('seleccionado'); // Deseleccionar otros
    }
  });
}

// Función para mostrar el pop-up con la imagen del producto
function mostrarPopup(imagen) {
  const popup = document.getElementById('popup');
  const popupImagen = document.getElementById('popup-imagen');
  // Asignar la imagen al pop-up
  popupImagen.src = `imagenes/${imagen}`;
  // Mostrar el pop-up
  popup.style.display = 'flex';
}

// Cerrar el pop-up
document.getElementById('cerrar-popup').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
});
