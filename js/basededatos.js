/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 10/12/2022
*/

//--------------------------------------------------------------------------------------------------
//Solicita los registros a la base de datos.
async function leerRegistros(datosRequeridos) {
  //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
  //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
  var ajaxrequest = new XMLHttpRequest()

  //Aquí va la ruta al archivo php que realiza la consulta a la base de datos.
  ajaxrequest.open(
    'POST',
    'https://www.informaticasc.com/curso22_23/Rodriguez/Pruebas/php/consultarRegistros.php',
    true,
  )
 
  ajaxrequest.onreadystatechange = async function () {
    //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
    if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
      let datosLeidos = ajaxrequest.response
      if (datosLeidos) {
        mostrarRegistro(JSON.parse(datosLeidos))
      }
    }
  }
  let envio = 'Envio=' + datosRequeridos
  
  ajaxrequest.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded',
  )
  ajaxrequest.send(envio)
}

//--------------------------------------------------------------------------------------------------
//Muestra registro de la interfaz.
function mostrarRegistro(registrosLeidos) {
  for (i = 0; i < registrosLeidos.length; i++) {
  // alert(arrayDatosIot[i].latitud)
  let opcion = document.createElement("option");
  opcion.value = registrosLeidos[i].latitud+ "," + registrosLeidos[i].longitud
  opcion.text = registrosLeidos[i].nombre
  // Añade a la select <select id=”elementos”></select> la option creada
  document.getElementById("sElementos").appendChild(opcion)
  }
  }