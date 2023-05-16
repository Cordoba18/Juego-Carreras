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

   <div class="tengocuenta" hidden>
   <?php include_once('vistas/Loguearse.php') ?>

   </div>

   <script src="js/IndexJs.js"></script>

</body>
</html>