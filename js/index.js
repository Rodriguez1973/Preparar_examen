let intervaloTiempo = 3 //Tiempo en segundos de la tarea programada.
let tareaPeriodica //Tarea periódica.
let iconosImagenes = [semaforoV, semaforoRAV, semaforoR] //Array con los iconos de las imágenes.
let indiceImagen = 0
let posicionOrigen
let dispositivosIOT = null //Dispositivos IOT.

//--------------------------------------------------------------------------------------------------
//Referencias de la interfaz.
sElementos = document.getElementById('sElementos')
sTipo = document.getElementById('sTipo')
iDistancia = document.getElementById('iDistancia')
map_canvas = document.getElementById('map_canvas')

//--------------------------------------------------------------------------------------------------
//Eventos.
//Cambio en sElementos.
sElementos.addEventListener('change', (evento) => {
  finalizarTareaPeriodica()
  borrarMarcadores()
  indiceImagen = 0
  posicionOrigen = convertirCadenaAPosicion(evento.target.value)
  //console.log(evento.target.value)
  añadirMarcador(posicionOrigen, iconosImagenes[0])
  centrarMapa(posicionOrigen)
  iniciarTareaPeriodica()
  sTipo.value='Caudal'
  iDistancia.value=0
})

//Cambio en sTipo.
sTipo.addEventListener('change', (evento) => {
  borrarMarcadores()
  añadirMarcador(posicionOrigen, iconosImagenes[indiceImagen])
  leerRegistrosPorTipo(evento.target.value)
})

//Cambio en iDistancia.
iDistancia.addEventListener('change', (evento) => {
  console.log(evento.target.value)
  if (dispositivosIOT) {
    borrarMarcadores()
    añadirMarcador(posicionOrigen, iconosImagenes[indiceImagen])
    for (let i = 0; i < dispositivosIOT.length; i++) {
      let posicionDispositivo = crearPosicion(
        dispositivosIOT[i].latitud,
        dispositivosIOT[i].longitud,
      )
      //Si la distancia es menor a iDistancia.value
      if (
        distanciaEntre2Puntos(posicionOrigen, posicionDispositivo) <
        evento.target.value
      ) {
        añadirMarcador(posicionDispositivo, iconosImagenes[indiceImagen])
      }
    }
  }
})

//--------------------------------------------------------------------------------------------------
//Iniciar tarea periódica.
function iniciarTareaPeriodica() {
  //Ejecuta la función repetidamente cada intervalo indicado en milisegundos.
  tareaPeriodica = setInterval(() => {
    cambiarImagen()
  }, intervaloTiempo * 1000)
}

//--------------------------------------------------------------------------------------------------
//Finalizar tarea periódica.
function finalizarTareaPeriodica() {
  clearInterval(tareaPeriodica)
}

//--------------------------------------------------------------------------------------------------
//Cambiar la imagen.
function cambiarImagen() {
  indiceImagen++
  if (indiceImagen >= iconosImagenes.length) {
    indiceImagen = 0
  }
  for (let i = 0; i < marcadores.length; i++) {
    marcadores[i].setIcon(iconosImagenes[indiceImagen]) //Cambia el ícono del mapa.
    marcadores[i].setMap(mapa) //Establece el ícono en el mapa.
  }
}

//--------------------------------------------------------------------------------------------------
//Inicio de la aplicación.
let nombreTabla = 'ElementosUrbanos'
//Leer posiciones.
leerRegistros(nombreTabla)
//Lee los registros por el tipo.
//leerRegistrosPorTipo(sTipo.value)
