let mapa //Referencia del mapa.
let latitud = 41.670141205551865 //Latitud de inicio del centro del mapa.
let longitud = -3.689933230224045 //Longitud de inicio del centro del mapa.
let marcadores = [] //Marcadores de posición del mapa.
let zoom = 14 //Zoom del mapa.

//--------------------------------------------------------------------------------------------------
//Representa el mapa en el contenedor de la interfaz.
function mostrarMapa() {
  mapa = new google.maps.Map(document.getElementById('map_canvas'), {
    // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
    center: crearPosicion(latitud, longitud), //El mapa se visualiza centrado en las coordenadas de latitud y longitud pasadas como argumento
    zoom: zoom, //Zoom del mapa
    draggableCursor: 'auto', //El nombre o la URL del cursor que se muestra al desplazar el mouse sobre un mapa arrastrable.
    draggingCursor: 'crosshair', //El nombre o la URL del cursor que se muestra cuando se arrastra el mapa.
    mapTypeId: google.maps.MapTypeId.SATELLITE, //Tipo de mapa.
  })
}

//--------------------------------------------------------------------------------------------------
//Crear literal de objeto lat/Lng.
function crearPosicion(latitud, longitud) {
  return new google.maps.LatLng(latitud, longitud)
}

//--------------------------------------------------------------------------------------------------
//Distancia entre dos distanciaEntre2Puntos en metros.
function distanciaEntre2Puntos(posicionInicial, posicionFinal) {
  return google.maps.geometry.spherical.computeDistanceBetween(posicionInicial,
    posicionFinal);
}

//--------------------------------------------------------------------------------------------------
//Referencia al icono del semáforo rojo. Define sus propiedades.
let semaforoR = {
  url: './imagenes/r.jpg', //Imagen del marcador de posición.
  scaledSize: new google.maps.Size(30, 30), //Tamaño escala.
  origin: new google.maps.Point(0, 0), //Origen imagen.
  anchor: new google.maps.Point(15,15 ), //Punto de anclaje
}

//--------------------------------------------------------------------------------------------------
//Referencia al icono del semáforo rojo, amarillo y verde. Define sus propiedades.
let semaforoRAV = {
  url: './imagenes/rav.jpg', //Imagen del marcador de posición.
  scaledSize: new google.maps.Size(30, 30), //Tamaño escala.
  origin: new google.maps.Point(0, 0), //Origen imagen.
  anchor: new google.maps.Point(15, 15), //Punto de anclaje
}

//--------------------------------------------------------------------------------------------------
//Referencia al icono del semáforo verde. Define sus propiedades.
let semaforoV = {
  url: './imagenes/v.jpg', //Imagen del marcador de posición.
  scaledSize: new google.maps.Size(30, 30), //Tamaño escala.
  origin: new google.maps.Point(0, 0), //Origen imagen.
  anchor: new google.maps.Point(15, 15), //Punto de anclaje
}

//--------------------------------------------------------------------------------------------------
//Función que realiza el borrado de los marcadores. Para poder borrar los marcadores es necesario almacenarlos en un array.
function borrarMarcadores() {
  // Elimina los marcadores de una consulta anterior
  for (var i = 0; i < marcadores.length; i++) {
    marcadores[i].setMap(null)
  }
  marcadores = new Array() //Crea una nueva referancia.
}

//--------------------------------------------------------------------------------------------------
// Añadir un marcador al mapa.
function añadirMarcador(posicion, icono) {
  let marcador = null

  marcador = new google.maps.Marker({
    icon: icono,
    position: posicion,
    map: mapa,
  })

  //Añade el evento click al marcador.
  google.maps.event.addListener(
    marcador,
    'click',
    function () {
      //mostrarInformacionMarcador(marcador)
    },
    false,
  )
  marcadores.push(marcador)
}

//--------------------------------------------------------------------------------------------------
//Centrar mapa.
function centrarMapa(posicion){
  mapa.setCenter(posicion)
}

//--------------------------------------------------------------------------------------------------
//Convierte los datos de la una cadena latitud,longitud en un objeto google.maps.LatLng.
function convertirCadenaAPosicion(cadenaPosicion){
  let coordenadas=cadenaPosicion.split(',')
  return crearPosicion(coordenadas[0],coordenadas[1])
}

//--------------------------------------------------------------------------------------------------
//Ejecución.
mostrarMapa() //Muestra el mapa al inicio de la interfaz.