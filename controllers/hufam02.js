let familiares = [
  { nombre: 'Juan Pérez', relacion: 'Padre', contacto: '5551234567' },
  { nombre: 'María Gómez', relacion: 'Madre', contacto: '5559876543' }
];

let indiceEditando = null; 

const tbody = document.getElementById('tablaFamiliaresBody');
const formAgregar = document.getElementById('formAgregarFamiliar');

function mostrarFamiliares(lista) {
  tbody.innerHTML = '';

  lista.forEach((familiar, index) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${familiar.nombre}</td>
      <td>${familiar.relacion}</td>
      <td>${familiar.contacto}</td>
      <td></td>
    `;

   
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'btn btn-sm btn-warning me-2';
    btnEditar.addEventListener('click', () => {
      // Cargar los datos en el formulario
      document.getElementById('nombre').value = familiar.nombre;
      document.getElementById('relacion').value = familiar.relacion;
      document.getElementById('contacto').value = familiar.contacto;
      indiceEditando = index;
    });

    
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = 'btn btn-sm btn-danger';
    btnEliminar.addEventListener('click', () => eliminarFamiliar(index));

    // Agregar botones en la celda de acciones
    const celdaAcciones = fila.querySelector('td:last-child');
    celdaAcciones.appendChild(btnEditar);  
    celdaAcciones.appendChild(btnEliminar);

    tbody.appendChild(fila);
  });
}

function eliminarFamiliar(index) {
  if (confirm('¿Estás seguro de que deseas eliminar este familiar?')) {
    familiares.splice(index, 1);
    guardarEnLocalStorage();
    mostrarFamiliares(familiares);
    indiceEditando = null; 
  }
}

function guardarEnLocalStorage() {
  localStorage.setItem('familiares', JSON.stringify(familiares));
}


formAgregar.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const relacion = document.getElementById('relacion').value.trim();
  const contacto = document.getElementById('contacto').value.trim();

  if (!nombre || !relacion || !contacto) {
    alert('Por favor completa todos los campos.');
    return;
  }

  if (contacto.length !== 10) {
    alert('El número debe de ser de 10 dígitos.');
    return;
  }

  if (indiceEditando !== null) {
    
    familiares[indiceEditando] = { nombre, relacion, contacto };
    indiceEditando = null;
  } else {
    
    const duplicado = familiares.find(f =>
      f.nombre.toLowerCase() === nombre.toLowerCase() ||
      f.contacto === contacto
    );

    if (duplicado) {
      alert('Este familiar ya fue registrado (nombre o contacto repetido).');
      return;
    }

    familiares.push({ nombre, relacion, contacto });
  }

  guardarEnLocalStorage();
  mostrarFamiliares(familiares);
  formAgregar.reset();
});

const datosGuardados = localStorage.getItem('familiares');
if (datosGuardados) {
  familiares = JSON.parse(datosGuardados);
}
mostrarFamiliares(familiares);
