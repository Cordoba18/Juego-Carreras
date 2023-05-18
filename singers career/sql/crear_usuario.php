<?php
include('conexion.php');
$con = conectar();
$sql = "SELECT*FROM personajes WHERE nombre = '$_POST[personaje]'";
$result = mysqli_query($con, $sql);
$json = array();
if ($mostrar = mysqli_fetch_array($result)) {
    $id_personaje = $mostrar['id'];
}
$sql = "INSERT INTO users (username, id_personaje) VALUES ('".$_POST['username']."', ".$id_personaje.")";  
$query = mysqli_query($con,$sql);
if($query){
    $json[] = array(
     'respuesta' => true,
     'user' => $_POST['username']
 );
 
}else{
    $json[] = array(
        'respuesta' => false,
        'user' => $_POST['username']
       );
}

mysqli_close($con);
$jsonsString = json_encode($json);
echo $jsonsString
?>