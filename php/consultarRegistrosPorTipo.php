<?php
/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 10/12/2022
Petición de registros a la base de datos.
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBd.php');
//Recibe el array con los datos JSON.
$condicion=$_POST['Envio'];
$condicion= str_replace("\\","", $condicion);
//No utilizado por ser una consulta simple, pero en $array existirian los datos para la consulta.
$array=explode(",",$condicion);   
//Si hay error en la conexión.
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
//Si no hay error en la conexión.
} else{
    //Consulta a realizar a la base de datos.
    $sql = "SELECT * FROM IOT_JoseantonioR where tipo=". $condicion;
    //echo $sql;
    //Realiza la consulta contra la base de datos.
    $resultado = mysqli_query($connect, $sql);
    //Busca el próximo registro de un conjunto de resultados como un array asociativo.
    while ($row = mysqli_fetch_assoc($resultado)) {
        $output[] = $row;
    }
    //Retorna la representación JSON de los datos de la consulta.
    print(json_encode($output));
    //Cierra la conexión a la base de datos.
    $connect->close();
}