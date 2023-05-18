<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <title>A CORRERRRRR</title>
</head>
<body id="BodyStart" style="background-color: black;">

   <div class="start" >
   <link rel="stylesheet" href="css/Index.css">
    <div class="logo">
        <img src="imgs/logo.png" alt="">
    </div>
    <div class="texto">
    <span class="parpadea text"><strong>PRESIONE UN BOTON</strong>
    </div>
   </div>
<?php
   $url = $_SERVER['REQUEST_URI'];


$parseUrl = parse_url($url);

if (isset($parseUrl['query'])) {
    
    parse_str($parseUrl['query'], $queryParams);
    
    
    unset($queryParams['user']);
    
    $newQuery = http_build_query($queryParams);
    
    $newUrl = $parseUrl['path'] . '?' . $newQuery;
}
?>
   <div class="elegir" hidden>
   <?php include_once('vistas/elegir.html') ?>
   </div>

   <div class="crear_usuario" hidden>
    <?php include_once('vistas/CrearUsuario.php') ?>
   </div>
   <p id="guardar_nombre_de_usuario" hidden></p>

   <div class="crear_personaje" hidden>
    <?php include_once('vistas/CrearPersonaje.php') ?>
   </div>

   <div id="vistaloguearse" hidden>
   <?php include_once('vistas/Loguearse.php') ?>
   </div>

   <div class="sala_usuario" hidden>
    <?php include_once('vistas/SalaUsuario.php') ?>
   </div>
   <script src="js/IndexJs.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" 
integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" 
crossorigin="anonymous"></script>
</body>
</html>