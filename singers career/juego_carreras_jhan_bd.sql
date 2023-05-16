-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-05-2023 a las 06:41:13
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `juego_carreras_jhan_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones`
--

CREATE TABLE `canciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `url_cancion` varchar(255) NOT NULL,
  `id_personaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `canciones`
--

INSERT INTO `canciones` (`id`, `nombre`, `url_cancion`, `id_personaje`) VALUES
(1, 'La Ruta - Arcangel', 'La_Ruta.mp3', 1),
(2, 'Pa que la pases bien -Arcangel', 'Pa_Que_La_Pases_Bien.mp3', 1),
(3, 'Feliz Cumpleaños Ferxxo', 'Feliz_Cumpleanos.mp3', 2),
(4, 'Hey Mor - Feid', 'Hey_Mor.mp3', 2),
(5, 'Gatubala - Karol G', 'Gatubala.mp3', 3),
(6, 'Provenza - Karol G', 'Provenza.mp3', 3),
(7, 'UY CUALEJESA REMIX - Los Rogelios', 'Cualejesa_REMIX.mp3', 4),
(8, 'Los Culos Se Botan - Los Rogelios', 'Los_Culos_Se_Botan.mp3', 4),
(9, 'Despecha - Rosalia', 'Despecha.mp3', 5),
(10, 'Con Altura - Rosalia', 'Con_Altura.mp3', 5),
(11, 'Hips Dont Like - Shakira', 'Hips_Dont_Like.mp3', 6),
(12, 'Shakira Bizzarap - Shakira', 'Shakira_Bzp.mp3', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participantes`
--

CREATE TABLE `participantes` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_personaje` int(11) NOT NULL,
  `id_sala` int(11) NOT NULL,
  `left` float DEFAULT NULL,
  `rol_participante` int(11) NOT NULL,
  `posicion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes`
--

CREATE TABLE `personajes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `vehiculo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personajes`
--

INSERT INTO `personajes` (`id`, `nombre`, `imagen`, `vehiculo`) VALUES
(1, 'Arcangel', 'Arcangel.png', 'Vehiculo-Arcangel.gif'),
(2, 'Feid', 'Feid.png', 'Vehiculo-Feid.gif'),
(3, 'Karol G', 'Karol_G.png', 'Vehiculo-KarolG.gif'),
(4, 'Los Rogelios', 'Los-Rogelios.jpg', 'Vehiculo-Los-Rogelios.gif'),
(5, 'Rosalia', 'Rosalia.png', 'Vehiculo-Rosalia.gif'),
(6, 'Shakira', 'Shakira.png', 'Vehiculo-Shakira.gif');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_participante`
--

CREATE TABLE `rol_participante` (
  `id` int(11) NOT NULL,
  `nombre_rol` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol_participante`
--

INSERT INTO `rol_participante` (`id`, `nombre_rol`) VALUES
(1, 'lider'),
(2, 'visitante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id` int(11) NOT NULL,
  `codigo` varchar(8) NOT NULL,
  `limite` varchar(2) NOT NULL,
  `posicion_meta` float NOT NULL,
  `id_user` int(11) NOT NULL,
  `estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `id_personaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD PRIMARY KEY (`id`,`id_personaje`),
  ADD KEY `fk_canciones_personajes1_idx` (`id_personaje`);

--
-- Indices de la tabla `participantes`
--
ALTER TABLE `participantes`
  ADD PRIMARY KEY (`id`,`id_usuario`,`id_personaje`,`id_sala`,`rol_participante`),
  ADD KEY `fk_participantes_users1_idx` (`id_usuario`,`id_personaje`),
  ADD KEY `fk_participantes_salas1_idx` (`id_sala`),
  ADD KEY `fk_participantes_rol_paritipante1_idx` (`rol_participante`);

--
-- Indices de la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rol_participante`
--
ALTER TABLE `rol_participante`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id`,`id_user`),
  ADD KEY `fk_salas_users1_idx` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`id_personaje`),
  ADD KEY `fk_users_Personajes_idx` (`id_personaje`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `canciones`
--
ALTER TABLE `canciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `participantes`
--
ALTER TABLE `participantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personajes`
--
ALTER TABLE `personajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD CONSTRAINT `fk_canciones_personajes1` FOREIGN KEY (`id_personaje`) REFERENCES `personajes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `participantes`
--
ALTER TABLE `participantes`
  ADD CONSTRAINT `fk_participantes_rol_paritipante1` FOREIGN KEY (`rol_participante`) REFERENCES `rol_participante` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_participantes_salas1` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_participantes_users1` FOREIGN KEY (`id_usuario`,`id_personaje`) REFERENCES `users` (`id`, `id_personaje`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `salas`
--
ALTER TABLE `salas`
  ADD CONSTRAINT `fk_salas_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_Personajes` FOREIGN KEY (`id_personaje`) REFERENCES `personajes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
