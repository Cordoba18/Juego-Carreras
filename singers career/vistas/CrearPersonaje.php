<link rel="stylesheet" href="css/CrearPersonajecss.css">
<?php include_once('sql/conexion.php'); ?>
<div class="texto_crear_usuario">
    <p> ESCOJE UN PERSONAJE </p>
</div>
<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">

  <?php
$con = conectar();
$sql = "SELECT*FROM personajes ";
$result = mysqli_query($con, $sql);
$nombre = [];
$imagen = [];
while ($mostrar = mysqli_fetch_array($result)) {
  $nombre[] = $mostrar['nombre'];
  $imagen[] = $mostrar['imagen'];
}
mysqli_close($con);
?>
    <div class="carousel-item active">
      <img class="d-block w-100" src="personajes/Fotos/<?php echo $imagen[0] ?>" >
      <div class="carousel-caption d-none d-md-block">
        <h5><?php echo $nombre[0] ?></h5>
    </div>
</div>
<?php for ($i=1; $i < count($nombre); $i++) {?> 

    <div class="carousel-item">
  <img src="personajes/Fotos/<?php echo $imagen[$i] ?>" >
  <div class="carousel-caption d-none d-md-block">
    <h5> <?php echo $nombre[$i] ?> </h5>
  </div>
</div> <?php } ?>
  </div>
  <a class="carousel-control-prev" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only"></span>
  </a>
  <a class="carousel-control-next" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only"></span>
  </a>
</div>

<script src="js/CP.js"></script>


