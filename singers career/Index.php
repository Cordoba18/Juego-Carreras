<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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


   <div class="elegir" hidden>
   <?php include_once('vistas/elegir.html') ?>
   </div>

   <div class="crear_usuario" hidden>
    <?php include_once('vistas/CrearUsuario.php') ?>
   </div>
   <p id="guardar_nombre_de_usuario"> </p>

   <div class="tengocuenta" hidden>
   <?php include_once('vistas/Loguearse.php') ?>

   </div>

   <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
   <script src="js/IndexJs.js"></script>

</body>
</html>