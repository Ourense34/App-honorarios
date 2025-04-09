function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
  }
  
  function calcularPresupuesto() {
    const regimen = document.getElementById('regimen').value;
    const horas = parseFloat(document.getElementById('horas').value);
    const precioBruto = parseFloat(document.getElementById('precio').value);
    const km = parseFloat(document.getElementById('km').value || 0); // Si no hay valor, se asume 0
  
    if (isNaN(horas) || isNaN(precioBruto)) {
      alert('Por favor, ingresa valores válidos para horas y precio bruto.');
      return;
    }
  
    const kilometrosTotales = km * 2;
    const costoKm = kilometrosTotales * 0.2; // Ejemplo: 0.2€/km
  
    let salarioNeto;
    if (regimen === 'general') {
      // Cálculos para Régimen General
      const seguridadSocial = 0.0645;
      const irpf = 0.1;
      const salarioBruto = horas * precioBruto;
      salarioNeto = salarioBruto - (salarioBruto * seguridadSocial) - (salarioBruto * irpf) - costoKm;
    } else if (regimen === 'autonomo') {
      // Cálculos para Autónomo
      const cuotaAutonomo = 379; // Cuota mensual
      const cotizacionFP = 0.001;
      const retencion = 0.15;
      const descuentoCuotaDia = cuotaAutonomo / 20.6; // Promedio de días laborables al mes
      const salarioBruto = horas * precioBruto;
      salarioNeto = salarioBruto - descuentoCuotaDia - (salarioBruto * cotizacionFP) - (salarioBruto * retencion) - costoKm;
    }
  
    // Mostrar resultado
    document.getElementById('resultado').innerHTML = `
      <strong>Régimen:</strong> ${regimen === 'general' ? 'Régimen General' : 'Autónomo'}<br>
      <strong>Salario neto:</strong> €${salarioNeto.toFixed(2)}<br>
      <strong>Kilómetros totales:</strong> ${kilometrosTotales} km<br>
      <strong>Costo por kilómetros:</strong> €${costoKm.toFixed(2)}
    `;
  }
  function agregarTrabajo() {
    // Obtener los valores del formulario
    const empresa = document.getElementById('empresa').value;
    const curso = document.getElementById('curso').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const horas = parseFloat(document.getElementById('horasHistorial').value);
    const precioHora = parseFloat(document.getElementById('precioHora').value);
    const kmTotales = parseFloat(document.getElementById('kmTotales').value);
    const personaContacto = document.getElementById('personaContacto').value;
    const email = document.getElementById('email').value;
    const movil = document.getElementById('movil').value;
    const telefono = document.getElementById('telefono').value;
    const web = document.getElementById('web').value;
  
    // Validar los datos
    if (!empresa || !curso || !fechaInicio || !fechaFin || isNaN(horas) || isNaN(precioHora) || isNaN(kmTotales)) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
  
    // Calcular el salario neto descontando el costo de los kilómetros
    const seguridadSocial = 0.0645;
    const irpf = 0.1;
    const salarioBruto = horas * precioHora;
    const costeKm = kmTotales * 0.2; // Ejemplo: 0.2€/km
    const salarioNeto = salarioBruto - (salarioBruto * (seguridadSocial + irpf)) - costeKm;
  
    // Crear una nueva fila en la tabla
    const tabla = document.getElementById('tablaHistorial').querySelector('tbody');
    const nuevaFila = document.createElement('tr');
  
    nuevaFila.innerHTML = `
      <td>${empresa}</td>
      <td>${curso}</td>
      <td>${fechaInicio}</td>
      <td>${fechaFin}</td>
      <td>${horas}</td>
      <td>${precioHora.toFixed(2)}</td>
      <td>${kmTotales}</td>
      <td>${salarioNeto.toFixed(2)}</td>
      <td>${personaContacto}</td>
      <td>${email}</td>
      <td>${movil}</td>
      <td>${telefono}</td>
      <td>${web}</td>
      <td>
        <button onclick="editarTrabajo(this)">Editar</button>
        <button onclick="eliminarTrabajo(this)">Eliminar</button>
      </td>
    `;
  
    // Añadir la nueva fila a la tabla
    tabla.appendChild(nuevaFila);
  
    // Limpiar los campos del formulario después de agregar el trabajo
    document.getElementById('formHistorial').reset();
  }
  function agregarTrabajo() {
    // Obtener los valores del formulario
    const empresa = document.getElementById('empresa').value;
    const curso = document.getElementById('curso').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const horas = parseFloat(document.getElementById('horasHistorial').value);
    const precioHora = parseFloat(document.getElementById('precioHora').value);
  
    // Validar los datos
    if (!empresa || !curso || !fechaInicio || !fechaFin || isNaN(horas) || isNaN(precioHora)) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
  
    // Calcular el salario bruto
    const salarioBruto = horas * precioHora;
  
    // Crear una nueva fila en la tabla
    const tabla = document.getElementById('tablaHistorial').querySelector('tbody');
    const nuevaFila = document.createElement('tr');
  
    nuevaFila.innerHTML = `
      <td>${empresa}</td>
      <td>${curso}</td>
      <td>${fechaInicio}</td>
      <td>${fechaFin}</td>
      <td>${horas}</td>
      <td>${precioHora.toFixed(2)}</td>
      <td>${salarioBruto.toFixed(2)}</td>
      <td>
        <button onclick="editarTrabajo(this)">Editar</button>
        <button onclick="eliminarTrabajo(this)">Eliminar</button>
      </td>
    `;
  
    // Añadir la nueva fila a la tabla
    tabla.appendChild(nuevaFila);
  
    // Limpiar los campos del formulario después de agregar el trabajo
    document.getElementById('formHistorial').reset();
  }
  
  function editarTrabajo(boton) {
    // Seleccionar la fila que contiene el botón
    const fila = boton.parentElement.parentElement;
    const celdas = fila.getElementsByTagName('td');
  
    // Rellenar el formulario con los datos existentes
    document.getElementById('empresa').value = celdas[0].innerText;
    document.getElementById('curso').value = celdas[1].innerText;
    document.getElementById('fechaInicio').value = celdas[2].innerText;
    document.getElementById('fechaFin').value = celdas[3].innerText;
    document.getElementById('horasHistorial').value = celdas[4].innerText;
    document.getElementById('precioHora').value = celdas[5].innerText;
  
    // Eliminar la fila actual (para evitar duplicados cuando se guarden los cambios)
    fila.remove();
  }
  
  function eliminarTrabajo(boton) {
    // Seleccionar la fila que contiene el botón y eliminarla
    const fila = boton.parentElement.parentElement;
    fila.remove();
  }
  function agregarTrabajo() {
    const empresa = document.getElementById('empresa').value;
    const curso = document.getElementById('curso').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const horas = parseFloat(document.getElementById('horasHistorial').value);
    const precioHora = parseFloat(document.getElementById('precioHora').value);
    const kmTotales = parseFloat(document.getElementById('kmTotales').value);
    const personaContacto = document.getElementById('personaContacto').value;
    const email = document.getElementById('email').value;
    const movil = document.getElementById('movil').value;
    const telefono = document.getElementById('telefono').value;
    const web = document.getElementById('web').value;
  
    const seguridadSocial = 0.0645;
    const irpf = 0.1;
    const salarioBruto = horas * precioHora;
    const costeKm = kmTotales * 0.2;
    const salarioNeto = salarioBruto - (salarioBruto * (seguridadSocial + irpf)) - costeKm;
  
    // Crear el objeto de trabajo
    const trabajo = {
      empresa,
      curso,
      fechaInicio,
      fechaFin,
      horas,
      precioHora,
      kmTotales,
      salarioNeto,
      personaContacto,
      email,
      movil,
      telefono,
      web
    };
  
    // Guardar en localStorage
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push(trabajo);
    localStorage.setItem('historial', JSON.stringify(historial));
  
    // Añadir la fila a la tabla
    mostrarHistorial();
  
    // Limpiar el formulario
    document.getElementById('formHistorial').reset();
  }
  
  function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const tabla = document.getElementById('tablaHistorial').querySelector('tbody');
    tabla.innerHTML = ''; // Limpiar la tabla antes de mostrar
  
    historial.forEach(trabajo => {
      const nuevaFila = document.createElement('tr');
      nuevaFila.innerHTML = `
        <td>${trabajo.empresa}</td>
        <td>${trabajo.curso}</td>
        <td>${trabajo.fechaInicio}</td>
        <td>${trabajo.fechaFin}</td>
        <td>${trabajo.horas}</td>
        <td>${trabajo.precioHora.toFixed(2)}</td>
        <td>${trabajo.kmTotales}</td>
        <td>${trabajo.salarioNeto.toFixed(2)}</td>
        <td>${trabajo.personaContacto}</td>
        <td>${trabajo.email}</td>
        <td>${trabajo.movil}</td>
        <td>${trabajo.telefono}</td>
        <td>${trabajo.web}</td>
        <td>
          <button onclick="editarTrabajo(this)">Editar</button>
          <button onclick="eliminarTrabajo(this)">Eliminar</button>
        </td>
      `;
      tabla.appendChild(nuevaFila);
    });
  }
  
  function eliminarTrabajo(boton) {
    const fila = boton.parentElement.parentElement;
    const index = Array.from(fila.parentElement.children).indexOf(fila);
  
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.splice(index, 1);
    localStorage.setItem('historial', JSON.stringify(historial));
  
    mostrarHistorial();
  }
  
  window.onload = mostrarHistorial; // Cargar historial al abrir la página
  function exportarHistorial() {
    // Obtener los datos guardados en localStorage
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
  
    if (historial.length === 0) {
      alert('No hay datos en el historial para exportar.');
      return;
    }
  
    // Convertir los datos a formato JSON
    const jsonHistorial = JSON.stringify(historial, null, 2); // Espaciado de 2 para legibilidad
  
    // Crear un archivo Blob con los datos
    const blob = new Blob([jsonHistorial], { type: 'application/json' });
  
    // Crear un enlace temporal para descargar el archivo
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = 'historial_trabajos.json'; // Nombre del archivo
    enlace.click();
  
    // Limpiar la URL del objeto para liberar memoria
    URL.revokeObjectURL(enlace.href);
  }
  function importarHistorial() {
    const fileInput = document.getElementById('fileInput');
  
    // Validar si se seleccionó un archivo
    if (fileInput.files.length === 0) {
      alert('Por favor, selecciona un archivo.');
      return;
    }
  
    const archivo = fileInput.files[0];
    const lector = new FileReader();
  
    lector.onload = function (event) {
      try {
        // Convertir el contenido del archivo a un objeto
        const datos = JSON.parse(event.target.result);
  
        // Guardar los datos en localStorage
        localStorage.setItem('historial', JSON.stringify(datos));
  
        // Mostrar los datos importados
        mostrarHistorial();
        alert('Historial importado correctamente.');
      } catch (error) {
        alert('Error al leer el archivo. Asegúrate de que sea un archivo JSON válido.');
      }
    };
  
    // Leer el archivo como texto
    lector.readAsText(archivo);
  }
  function exportarHistorial() {
    // Obtener los datos guardados en localStorage
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
  
    if (historial.length === 0) {
      alert('No hay datos en el historial para exportar.');
      return;
    }
  
    // Convertir los datos a formato JSON
    const jsonHistorial = JSON.stringify(historial, null, 2); // Espaciado de 2 para legibilidad
  
    // Crear un archivo Blob con los datos
    const blob = new Blob([jsonHistorial], { type: 'application/json' });
  
    // Crear un enlace temporal para descargar el archivo
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = 'historial_trabajos.json'; // Nombre del archivo
    enlace.click();
  
    // Limpiar la URL del objeto para liberar memoria
    URL.revokeObjectURL(enlace.href);
  }
            