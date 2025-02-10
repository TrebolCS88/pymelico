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
            <img src="imagenes/${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <p><strong>Vendedor:</strong> ${producto.vendedor}</p>
            <button onclick="mostrarPopup(${producto.id})">Seleccionar</button>
          </div>
        `;
        productosContainer.innerHTML += productoHTML;
      });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
});

// Función para mostrar el pop-up
function mostrarPopup(id) {
  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      const producto = data.find(p => p.id === id);
      if (producto) {
        document.getElementById('popup-imagen').src = `imagenes/${producto.imagen}`;
        document.getElementById('popup-nombre').textContent = producto.nombre;
        document.getElementById('popup-descripcion').textContent = producto.descripcion_detallada;
        document.getElementById('popup').style.display = 'flex';
      }
    })
    .catch(error => console.error('Error al cargar el producto:', error));
}

// Cerrar el pop-up
document.getElementById('cerrar-popup').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
});
