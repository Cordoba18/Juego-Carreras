<?php 
include('conexion.php');
$con = conectar();
$sql = "SELECT u.username, p.imagen, p.vehiculo, p.nombre FROM users u 
INNER JOIN personajes p ON p.id = u.id_personaje 
WHERE u.username = '$_POST[usuario]';";
$result = mysqli_query($con, $sql);
$json = array();
if ($mostrar = mysqli_fetch_array($result)) {
  
    $json[] = array(
        'username' => $mostrar['username'],
        'personaje' => $mostrar['nombre'],
        'imagen' => $mostrar['imagen'],
        'vehiculo' => $mostrar['vehiculo'],
        'respuesta' => true
       );
}
mysqli_close($con);
$jsonsString = json_encode($json);
echo $jsonsString
?>