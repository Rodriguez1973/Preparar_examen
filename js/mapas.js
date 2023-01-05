let mapa
let murallas = new Array()
let latitud = 41.67097948393865
let longitud = -3.6769259916763985
let latitudgeolocation
let longitudgeolocation
let marcadorGeolocation
let marcadorFijo
let marcador
let icono
let iconoRojo
let iconoVerde
let iconoAmbar

//Obtiene la localización actual del dispositivo en latitud, longitud
// Esta posición se utiliza mas adelante para crear un marcador y
// para dibujar una linea a los marcadores que se crean al hacer clic sobre el mama
navigator.geolocation.getCurrentPosition((posicion) => {
  latitudgeolocation = posicion.coords.latitude
  longitudgeolocation = posicion.coords.longitude
  marcadorGeolocation = new google.maps.LatLng(
    latitudgeolocation,
    longitudgeolocation,
  )
})

icono = {
  url: './imagenes/rav.jpg', // url
  scaledSize: new google.maps.Size(25, 25), // scaled size
  origin: new google.maps.Point(0, 0), // origin
  anchor: new google.maps.Point(0, 0), // anchor
}

function trazarLinea() {
  tzoom = 18
  mapa = new google.maps.Map(document.getElementById('map_canvas'), {
    // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
    center: new google.maps.LatLng(latitud, longitud), //latitud,longitud),//
    // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
    zoom: tzoom, // zoom del mapa
    draggableCursor: 'auto', // forma del cursor
    draggingCursor: 'crosshair',
    mapTypeId: google.maps.MapTypeId.SATELLITE, // tipo de mama
  })

  icono = {
    url: './imagenes/rav.jpg', // url
    scaledSize: new google.maps.Size(tzoom, tzoom), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  }

  // Crear un marcador en la posición en la que hacemos click sobre el mapa
  google.maps.event.addListener(mapa, 'click', function (event) {
    marcadorFijo = event.latLng.toString()
    marker = new google.maps.Marker({
      position: event.latLng,
      icon: icono,
      map: mapa,
      nombre: 'Pepino',
    })
    mapa.setCenter(event.latLng)
    // Funcion que dibuja una linea desde el martcador creado al hacer click al marcador
    // obtenifo por geolocation
    Trazar_onclick()
  })

  // Marcador obtenido de la geolocalizacion
  marcadorGeolocation = new google.maps.LatLng(
    latitudgeolocation,
    longitudgeolocation,
  )

  marker2 = new google.maps.Marker({
    position: marcadorGeolocation,
    icon: icono,
    map: mapa,
    nombre: 'geolocalizacion',
  })
  mapa.setCenter(marcadorGeolocation)
}

function Trazar_onclick() {
  let colortrazado = 'blue'
  let grosorTrazado = 4
  // Define un array con las posiones de los marcadores entre los cuales queremos
  // dibujar la línea.
  var posiciones = '['
  posiciones = posiciones + 'new google.maps.LatLng' + marcadorFijo + ','
  posiciones = posiciones + 'new google.maps.LatLng' + marcadorGeolocation + ''
  posiciones = posiciones + ']'

  console.log(posiciones)
  // Crear un objeto Polyline que define las propiedades de la linea a dibujar
  var polygon =
    'new google.maps.Polyline({' +
    'path:' +
    posiciones +
    ',' +
    "strokeColor:'" +
    colortrazado +
    "'," +
    'strokeOpacity: 2,' +
    'strokeWeight:' +
    grosorTrazado +
    ',' +
    'geodesic: true})'
  
  //Dibuja el Polyline creado en el mapa
  polygon.setMap(mapa)

  // MIDE DISTAN CIA

  var posicionInicial = marcadorFijo //  eval(pi));//
  var posicionFinal = marcadorGeolocation // eval(pf));//

  // Calcula la distancia entre marcadorFijo y marcadorGeolocation
  var angulo = google.maps.geometry.spherical.computeHeading(
    posicionInicial,
    posicionFinal,
  )
  var distancia = google.maps.geometry.spherical.computeDistanceBetween(
    posicionInicial,
    posicionFinal,
  )

  distaciaMarcadores.innerText = 'Distancia : ' + distancia
}
