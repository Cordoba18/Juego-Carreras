<link rel="stylesheet" href="css/Loguarsecss.css">
<div class="texto-loguearse">
    <p> INGRESE SU NOMBRE DE USUARIO</p>
</div>
<?php
$url = $_SERVER['REQUEST_URI'];


$parseUrl = parse_url($url);

if (isset($parseUrl['query'])) {
    
    parse_str($parseUrl['query'], $queryParams);
    
    
    unset($queryParams['user']);
    
    $newQuery = http_build_query($queryParams);
    
    $newUrl = $parseUrl['path'] . '?' . $newQuery;
}?>
    <div class="contenedor-input">
    <input id="input-username" type="text" placeholder="NOMBRE DE USUARIO" required>
    <p id="error-input"> </p>
    </div>
    <div class="contenedor-button">
        <button id="boton-loguearse"> ENTRAR </button>
    </div>
    <div class="contenedor-volver">
        <a id="btn_volver_loguearse" href>VOLVER</a>
    </div>
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <script src="js/Loguearse.js"></script>