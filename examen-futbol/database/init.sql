CREATE TABLE IF NOT EXISTS equipos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    estadio VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS jugadores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    posicion VARCHAR(50) NOT NULL,
    numero INT NOT NULL,
    equipo_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS partidos (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    equipo_local_id INT NOT NULL,
    equipo_visitante_id INT NOT NULL,
    goles_local INT NOT NULL,
    goles_visitante INT NOT NULL
);

INSERT INTO equipos (nombre, ciudad, estadio) VALUES
('Tigres', 'Monterrey', 'Estadio Universitario'),
('Chivas', 'Guadalajara', 'Estadio Akron'),
('América', 'Ciudad de México', 'Estadio Ciudad de los Deportes');

INSERT INTO jugadores (nombre, posicion, numero, equipo_id) VALUES
('André Pierre Gignac', 'Delantero', 10, 1),
('Roberto Alvarado', 'Mediocampista', 25, 2),
('Henry Martín', 'Delantero', 21, 3);

INSERT INTO partidos (fecha, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante) VALUES
('2026-05-25', 1, 2, 2, 1),
('2026-05-26', 3, 1, 1, 1);

