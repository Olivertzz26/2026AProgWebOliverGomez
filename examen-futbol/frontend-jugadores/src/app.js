const API_URL = "http://localhost:3002/jugadores";
const API_EQUIPOS_URL = "http://localhost:3002/equipos";

const form = document.getElementById("jugador-form");
const inputId = document.getElementById("jugador-id");
const inputNombre = document.getElementById("nombre");
const inputPosicion = document.getElementById("posicion");
const inputNumero = document.getElementById("numero");
const inputEquipoId = document.getElementById("equipo_id");
const lista = document.getElementById("jugadores-lista");
const mensaje = document.getElementById("mensaje");
const formTitle = document.getElementById("form-title");
const btnCancelar = document.getElementById("btn-cancelar");

async function cargarEquipos() {
  try {
    const respuesta = await fetch(API_EQUIPOS_URL);
    const equipos = await respuesta.json();

    inputEquipoId.innerHTML = `<option value="">Selecciona un equipo</option>`;

    equipos.forEach((equipo) => {
      const option = document.createElement("option");
      option.value = equipo.id;
      option.textContent = `${equipo.nombre} - ID ${equipo.id}`;
      inputEquipoId.appendChild(option);
    });
  } catch (error) {
    mostrarMensaje("Error al cargar equipos", "error");
  }
}

async function cargarJugadores() {
  try {
    const respuesta = await fetch(API_URL);
    const jugadores = await respuesta.json();

    lista.innerHTML = "";

    if (jugadores.length === 0) {
      lista.innerHTML = "<p>No hay jugadores registrados.</p>";
      return;
    }

    jugadores.forEach((jugador) => {
      const card = document.createElement("div");
      card.className = "jugador";

      const equipoNombre = jugador.equipo_nombre || "Sin equipo";

      card.innerHTML = `
        <h3>${jugador.nombre}</h3>
        <p><strong>ID:</strong> ${jugador.id}</p>
        <p><strong>Posición:</strong> ${jugador.posicion}</p>
        <p><strong>Número:</strong> ${jugador.numero}</p>
        <p><strong>ID Equipo:</strong> ${jugador.equipo_id}</p>
        <p><strong>Equipo:</strong> ${equipoNombre}</p>

        <div class="acciones">
          <button class="btn-editar" onclick="editarJugador(${jugador.id}, '${jugador.nombre}', '${jugador.posicion}', ${jugador.numero}, ${jugador.equipo_id})">
            Editar
          </button>

          <button class="btn-eliminar" onclick="eliminarJugador(${jugador.id})">
            Eliminar
          </button>
        </div>
      `;

      lista.appendChild(card);
    });
  } catch (error) {
    mostrarMensaje("Error al cargar jugadores", "error");
  }
}

async function guardarJugador(event) {
  event.preventDefault();

  const jugador = {
    nombre: inputNombre.value,
    posicion: inputPosicion.value,
    numero: Number(inputNumero.value),
    equipo_id: Number(inputEquipoId.value),
  };

  const id = inputId.value;

  try {
    if (id) {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jugador),
      });

      mostrarMensaje("Jugador actualizado correctamente", "ok");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jugador),
      });

      mostrarMensaje("Jugador registrado correctamente", "ok");
    }

    limpiarFormulario();
    cargarJugadores();
  } catch (error) {
    mostrarMensaje("Error al guardar jugador", "error");
  }
}

function editarJugador(id, nombre, posicion, numero, equipoId) {
  inputId.value = id;
  inputNombre.value = nombre;
  inputPosicion.value = posicion;
  inputNumero.value = numero;
  inputEquipoId.value = equipoId;

  formTitle.textContent = "Editar jugador";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function eliminarJugador(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar este jugador?");

  if (!confirmar) {
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    mostrarMensaje("Jugador eliminado correctamente", "ok");
    cargarJugadores();
  } catch (error) {
    mostrarMensaje("Error al eliminar jugador", "error");
  }
}

function limpiarFormulario() {
  inputId.value = "";
  inputNombre.value = "";
  inputPosicion.value = "";
  inputNumero.value = "";
  inputEquipoId.value = "";
  formTitle.textContent = "Registrar jugador";
}

function mostrarMensaje(texto, tipo) {
  mensaje.innerHTML = `<div class="mensaje-${tipo}">${texto}</div>`;

  setTimeout(() => {
    mensaje.innerHTML = "";
  }, 3000);
}

form.addEventListener("submit", guardarJugador);
btnCancelar.addEventListener("click", limpiarFormulario);

window.editarJugador = editarJugador;
window.eliminarJugador = eliminarJugador;

cargarEquipos();
cargarJugadores();
