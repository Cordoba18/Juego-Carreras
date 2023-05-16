<?php
include('conexion.php');
$con = conectar();
$sql = "SELECT*FROM users WHERE username = '$_POST[usuario]'";
$result = mysqli_query($con, $sql);
$json = array();
if ($mostrar = mysqli_fetch_array($result)) {
   $json[] = array(
    'respuesta' => true,
    'user' => $_POST['usuario']
);
}else {
    $json[] = array(
     'respuesta' => false,
     'user' => $_POST['usuario']
    );
}
mysqli_close($con);
$jsonsString = json_encode($json);
echo $jsonsString
?>