const API_URL = "http://localhost:3001/equipos";

const form = document.getElementById("equipo-form");
const inputId = document.getElementById("equipo-id");
const inputNombre = document.getElementById("nombre");
const inputCiudad = document.getElementById("ciudad");
const inputEstadio = document.getElementById("estadio");
const lista = document.getElementById("equipos-lista");
const mensaje = document.getElementById("mensaje");
const formTitle = document.getElementById("form-title");
const btnCancelar = document.getElementById("btn-cancelar");

async function cargarEquipos() {
  try {
    const respuesta = await fetch(API_URL);
    const equipos = await respuesta.json();

    lista.innerHTML = "";

    if (equipos.length === 0) {
      lista.innerHTML = "<p>No hay equipos registrados.</p>";
      return;
    }

    equipos.forEach((equipo) => {
      const card = document.createElement("div");
      card.className = "equipo";

      card.innerHTML = `
        <h3>${equipo.nombre}</h3>
        <p><strong>ID:</strong> ${equipo.id}</p>
        <p><strong>Ciudad:</strong> ${equipo.ciudad}</p>
        <p><strong>Estadio:</strong> ${equipo.estadio}</p>

        <div class="acciones">
          <button class="btn-editar" onclick="editarEquipo(${equipo.id}, '${equipo.nombre}', '${equipo.ciudad}', '${equipo.estadio}')">
            Editar
          </button>

          <button class="btn-eliminar" onclick="eliminarEquipo(${equipo.id})">
            Eliminar
          </button>
        </div>
      `;

      lista.appendChild(card);
    });
  } catch (error) {
    mostrarMensaje("Error al cargar equipos", "error");
  }
}

async function guardarEquipo(event) {
  event.preventDefault();

  const equipo = {
    nombre: inputNombre.value,
    ciudad: inputCiudad.value,
    estadio: inputEstadio.value,
  };

  const id = inputId.value;

  try {
    if (id) {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipo),
      });

      mostrarMensaje("Equipo actualizado correctamente", "ok");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipo),
      });

      mostrarMensaje("Equipo registrado correctamente", "ok");
    }

    limpiarFormulario();
    cargarEquipos();
  } catch (error) {
    mostrarMensaje("Error al guardar equipo", "error");
  }
}

function editarEquipo(id, nombre, ciudad, estadio) {
  inputId.value = id;
  inputNombre.value = nombre;
  inputCiudad.value = ciudad;
  inputEstadio.value = estadio;

  formTitle.textContent = "Editar equipo";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function eliminarEquipo(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar este equipo?");

  if (!confirmar) {
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    mostrarMensaje("Equipo eliminado correctamente", "ok");
    cargarEquipos();
  } catch (error) {
    mostrarMensaje("Error al eliminar equipo", "error");
  }
}

function limpiarFormulario() {
  inputId.value = "";
  inputNombre.value = "";
  inputCiudad.value = "";
  inputEstadio.value = "";
  formTitle.textContent = "Registrar equipo";
}

function mostrarMensaje(texto, tipo) {
  mensaje.innerHTML = `<div class="mensaje-${tipo}">${texto}</div>`;

  setTimeout(() => {
    mensaje.innerHTML = "";
  }, 3000);
}

form.addEventListener("submit", guardarEquipo);
btnCancelar.addEventListener("click", limpiarFormulario);

window.editarEquipo = editarEquipo;
window.eliminarEquipo = eliminarEquipo;

cargarEquipos();
