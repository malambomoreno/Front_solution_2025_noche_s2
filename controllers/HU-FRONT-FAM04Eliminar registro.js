let form = document.getElementById('familiarForm');
let tabla = document.getElementById('tablaFamiliares').querySelector('tbody');
let mensaje = document.getElementById('mensaje');


let filaEditando = null;

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let nombre = document.getElementById('nombre').value.trim();
  let parentesco = document.getElementById('parentesco').value;
  let telefono = document.getElementById('telefono').value.trim();
  let email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
  let direccion = document.getElementById('direccion') ? document.getElementById('direccion').value.trim() : '';

  if (!nombre || !parentesco || !telefono) {
    mensaje.textContent = 'Por favor completa todos los campos requeridos.';
    setTimeout(() => mensaje.textContent = '', 3000);
    return;
  }

  if (filaEditando) {
    
    filaEditando.cells[0].textContent = nombre;
    filaEditando.cells[1].textContent = parentesco;
    filaEditando.cells[2].textContent = telefono;
    filaEditando.cells[3].textContent = email || 'N/A';
    filaEditando.cells[4].textContent = direccion || 'N/A';

    mensaje.textContent = 'Familiar actualizado correctamente.';
    filaEditando = null; // Reset
  } else {
   
    let fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${nombre}</td>
      <td>${parentesco}</td>
      <td>${telefono}</td>
      <td>${email || 'N/A'}</td>
      <td>${direccion || 'N/A'}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2">Editar</button>
        <button class="btn btn-danger btn-sm">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);

   
    let btnEditar = fila.querySelector('.btn-warning');
    btnEditar.addEventListener('click', function() {
      
      document.getElementById('nombre').value = fila.cells[0].textContent;
      document.getElementById('parentesco').value = fila.cells[1].textContent;
      document.getElementById('telefono').value = fila.cells[2].textContent;
      document.getElementById('email').value = fila.cells[3].textContent !== 'N/A' ? fila.cells[3].textContent : '';
      document.getElementById('direccion').value = fila.cells[4].textContent !== 'N/A' ? fila.cells[4].textContent : '';

      filaEditando = fila; // Guardar referencia de la fila
      mensaje.textContent = 'Editando familiar... modifica y guarda los cambios.';
    });

    
    let btnEliminar = fila.querySelector('.btn-danger');
    btnEliminar.addEventListener('click', function() {
      if (confirm('¿Seguro que desea eliminar este familiar?')) {
        fila.remove();
        mensaje.textContent = 'Familiar eliminado correctamente.';
      } else {
        mensaje.textContent = 'Acción cancelada.';
      }
      setTimeout(() => mensaje.textContent = '', 3000);
    });

    mensaje.textContent = 'Familiar agregado correctamente.';
  }

  
  form.reset();
  setTimeout(() => mensaje.textContent = '', 3000);
});
