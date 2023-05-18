<link rel="stylesheet" href="css/CrearPersonajecss.css">
<?php include_once('sql/conexion.php'); ?>
<div class="texto_crear_usuario">
    <p> ESCOJE UN PERSONAJE </p>
</div>
<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
    <?php $con = conectar();
$sql = "SELECT*FROM personajes ";
$result = mysqli_query($con, $sql);
$nombre = [];
$imagen = [];
while($mostrar = mysqli_fetch_array($result)) {
  $nombre[] = $mostrar['nombre'];
  $imagen[] = $mostrar['imagen'];
}
mysqli_close($con);?>
      <img style="width: 400px; height: 300px;" src="personajes/Fotos/<?php echo $imagen[0] ?>" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5  id="nombre"  style=" background-color: #B71375; color: white; border-radius: 30px; text-align: center;"><?php echo $nombre[0]?></h5>
      </div>
    </div>
    <?php for($i = 1; $i < count($nombre); $i++) {
    echo "<div class='carousel-item'>
      <img style='width='400px'; height='300px';' src='personajes/Fotos/$imagen[$i]' class='d-block w-100' alt='...'>
      <div class='carousel-caption d-none d-md-block'>
        <h5 id='nombre' style=' background-color: #B71375; color: white; border-radius: 30px; text-align: center;'>$nombre[$i]</h5>
      </div>
    </div>";
     } ?>
  </div>
  <button id="btn-izquierda" class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span  class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span  class="visually-hidden">Previous</span>
  </button>
  <button id="btn-derecha" class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span  class="carousel-control-next-icon" aria-hidden="true"></span>
    <span  class="visually-hidden">Next</span>
  </button>
</div>
<div class="contenedor-boton">
  <button id="btn-seleccionar"> SELECCIONAR </button>
</div>
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="js/CP.js"></script>

