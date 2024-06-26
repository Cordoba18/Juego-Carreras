-- MySQL Script generated by MySQL Workbench
-- Mon May 15 18:29:08 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema juego_carreras_jhan_bd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema juego_carreras_jhan_bd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `juego_carreras_jhan_bd` DEFAULT CHARACTER SET utf8 ;
USE `juego_carreras_jhan_bd` ;

-- -----------------------------------------------------
-- Table `juego_carreras_jhan_bd`.`personajes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `juego_carreras_jhan_bd`.`personajes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(255) NOT NULL,
  `vehiculo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `juego_carreras_jhan_bd`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `juego_carreras_jhan_bd`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `id_personaje` INT NOT NULL,
  PRIMARY KEY (`id`, `id_personaje`),
  INDEX `fk_users_Personajes_idx` (`id_personaje` ASC) ,
  CONSTRAINT `fk_users_Personajes`
    FOREIGN KEY (`id_personaje`)
    REFERENCES `juego_carreras_jhan_bd`.`personajes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `juego_carreras_jhan_bd`.`canciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `juego_carreras_jhan_bd`.`canciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `url_cancion` VARCHAR(255) NOT NULL,
  `id_personaje` INT NOT NULL,
  PRIMARY KEY (`id`, `id_personaje`),
  INDEX `fk_canciones_personajes1_idx` (`id_personaje` ASC) ,
  CONSTRAINT `fk_canciones_personajes1`
    FOREIGN KEY (`id_personaje`)
    REFERENCES `juego_carreras_jhan_bd`.`personajes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `juego_carreras_jhan_bd`.`salas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `juego_carreras_jhan_bd`.`salas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(8) NOT NULL,
  `limite` VARCHAR(2) NOT NULL,
  `posicion_meta` FLOAT NOT NULL,
  `id_user` INT NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `id_user`),
  INDEX `fk_salas_users1_idx` (`id_user` ASC) ,
  CONSTRAINT `fk_salas_users1`
    FOREIGN KEY (`id_user`)
    REFERENCES `juego_carreras_jhan_bd`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `juego_carreras_jhan_bd`.`rol_participante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `juego_carreras_jhan_bd`.`rol_participante` (
  `id` INT NOT NULL,
  `nombre_rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `juego_carreras_jhan_bd`.`participantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `juego_carreras_jhan_bd`.`participantes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_personaje` INT NOT NULL,
  `id_sala` INT NOT NULL,
  `left` FLOAT NULL,
  `rol_participante` INT NOT NULL,
  `posicion` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `id_usuario`, `id_personaje`, `id_sala`, `rol_participante`),
  INDEX `fk_participantes_users1_idx` (`id_usuario` ASC, `id_personaje` ASC),
  INDEX `fk_participantes_salas1_idx` (`id_sala` ASC),
  INDEX `fk_participantes_rol_paritipante1_idx` (`rol_participante` ASC) ,
  CONSTRAINT `fk_participantes_users1`
    FOREIGN KEY (`id_usuario` , `id_personaje`)
    REFERENCES `juego_carreras_jhan_bd`.`users` (`id` , `id_personaje`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_participantes_salas1`
    FOREIGN KEY (`id_sala`)
    REFERENCES `juego_carreras_jhan_bd`.`salas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_participantes_rol_paritipante1`
    FOREIGN KEY (`rol_participante`)
    REFERENCES `juego_carreras_jhan_bd`.`rol_participante` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
