const API_URL = "http://localhost:3003/partidos";
const API_EQUIPOS_URL = "http://localhost:3003/equipos";

const form = document.getElementById("partido-form");
const inputId = document.getElementById("partido-id");
const inputFecha = document.getElementById("fecha");
const inputEquipoLocal = document.getElementById("equipo_local_id");
const inputEquipoVisitante = document.getElementById("equipo_visitante_id");
const inputGolesLocal = document.getElementById("goles_local");
const inputGolesVisitante = document.getElementById("goles_visitante");
const lista = document.getElementById("partidos-lista");
const mensaje = document.getElementById("mensaje");
const formTitle = document.getElementById("form-title");
const btnCancelar = document.getElementById("btn-cancelar");

async function cargarEquipos() {
  try {
    const respuesta = await fetch(API_EQUIPOS_URL);
    const equipos = await respuesta.json();

    inputEquipoLocal.innerHTML = `<option value="">Selecciona equipo local</option>`;
    inputEquipoVisitante.innerHTML = `<option value="">Selecciona equipo visitante</option>`;

    equipos.forEach((equipo) => {
      const optionLocal = document.createElement("option");
      optionLocal.value = equipo.id;
      optionLocal.textContent = `${equipo.nombre} - ID ${equipo.id}`;
      inputEquipoLocal.appendChild(optionLocal);

      const optionVisitante = document.createElement("option");
      optionVisitante.value = equipo.id;
      optionVisitante.textContent = `${equipo.nombre} - ID ${equipo.id}`;
      inputEquipoVisitante.appendChild(optionVisitante);
    });
  } catch (error) {
    mostrarMensaje("Error al cargar equipos", "error");
  }
}

async function cargarPartidos() {
  try {
    const respuesta = await fetch(API_URL);
    const partidos = await respuesta.json();

    lista.innerHTML = "";

    if (partidos.length === 0) {
      lista.innerHTML = "<p>No hay partidos registrados.</p>";
      return;
    }

    partidos.forEach((partido) => {
      const card = document.createElement("div");
      card.className = "partido";

      const fechaFormateada = new Date(partido.fecha).toLocaleDateString("es-MX");
      const equipoLocal = partido.equipo_local_nombre || "Equipo local";
      const equipoVisitante = partido.equipo_visitante_nombre || "Equipo visitante";

      card.innerHTML = `
        <h3>Partido #${partido.id}</h3>
        <p><strong>Fecha:</strong> ${fechaFormateada}</p>
        <p><strong>Local:</strong> ${equipoLocal}</p>
        <p><strong>Visitante:</strong> ${equipoVisitante}</p>
        <div class="resultado">
          ${partido.goles_local} - ${partido.goles_visitante}
        </div>

        <div class="acciones">
          <button class="btn-editar" onclick="editarPartido(${partido.id}, '${partido.fecha}', ${partido.equipo_local_id}, ${partido.equipo_visitante_id}, ${partido.goles_local}, ${partido.goles_visitante})">
            Editar
          </button>

          <button class="btn-eliminar" onclick="eliminarPartido(${partido.id})">
            Eliminar
          </button>
        </div>
      `;

      lista.appendChild(card);
    });
  } catch (error) {
    mostrarMensaje("Error al cargar partidos", "error");
  }
}

async function guardarPartido(event) {
  event.preventDefault();

  if (inputEquipoLocal.value === inputEquipoVisitante.value) {
    mostrarMensaje("El equipo local y visitante no pueden ser el mismo", "error");
    return;
  }

  const partido = {
    fecha: inputFecha.value,
    equipo_local_id: Number(inputEquipoLocal.value),
    equipo_visitante_id: Number(inputEquipoVisitante.value),
    goles_local: Number(inputGolesLocal.value),
    goles_visitante: Number(inputGolesVisitante.value),
  };

  const id = inputId.value;

  try {
    if (id) {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partido),
      });

      mostrarMensaje("Partido actualizado correctamente", "ok");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partido),
      });

      mostrarMensaje("Partido registrado correctamente", "ok");
    }

    limpiarFormulario();
    await cargarPartidos();
  } catch (error) {
    mostrarMensaje("Error al guardar partido", "error");
  }
}

function editarPartido(id, fecha, equipoLocalId, equipoVisitanteId, golesLocal, golesVisitante) {
  inputId.value = id;

  const fechaCorta = fecha.substring(0, 10);
  inputFecha.value = fechaCorta;

  inputEquipoLocal.value = equipoLocalId;
  inputEquipoVisitante.value = equipoVisitanteId;
  inputGolesLocal.value = golesLocal;
  inputGolesVisitante.value = golesVisitante;

  formTitle.textContent = "Editar partido";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function eliminarPartido(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar este partido?");

  if (!confirmar) {
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    mostrarMensaje("Partido eliminado correctamente", "ok");
    await cargarPartidos();
  } catch (error) {
    mostrarMensaje("Error al eliminar partido", "error");
  }
}

function limpiarFormulario() {
  inputId.value = "";
  inputFecha.value = "";
  inputEquipoLocal.value = "";
  inputEquipoVisitante.value = "";
  inputGolesLocal.value = "";
  inputGolesVisitante.value = "";
  formTitle.textContent = "Registrar partido";
}

function mostrarMensaje(texto, tipo) {
  mensaje.innerHTML = `<div class="mensaje-${tipo}">${texto}</div>`;

  setTimeout(() => {
    mensaje.innerHTML = "";
  }, 3000);
}

form.addEventListener("submit", guardarPartido);
btnCancelar.addEventListener("click", limpiarFormulario);

window.editarPartido = editarPartido;
window.eliminarPartido = eliminarPartido;

cargarEquipos();
cargarPartidos();
