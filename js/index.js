let intervaloTiempo=3 //Tiempo en segundos de la tarea programada.
let tareaTemporizada //Tarea temporizada.
let iconosImagenes=[semaforoV,semaforoRAV,semaforoR] //Array con los iconos de las imágenes.
let indiceImagen=0;

//--------------------------------------------------------------------------------------------------
//Referencias de la interfaz.
sElementos=document.getElementById("sElementos")
iDistancia=document.getElementById("iDistancia")
map_canvas=document.getElementById("map_canvas")

//--------------------------------------------------------------------------------------------------
//Eventos.
sElementos.addEventListener('change',(evento)=>{
  finalizarTareaTemporizada()
  indiceImagen=0;
  //console.log(evento.target.value)
  añadirMarcador(convertirCadenaAPosicion(evento.target.value),iconosImagenes[0])
  centrarMapa(convertirCadenaAPosicion(evento.target.value))
  iniciarTareaTemporizada()
})

//--------------------------------------------------------------------------------------------------
//Iniciar tarea temporizada.
function iniciarTareaTemporizada() {
  //Ejecuta la función repetidamente cada intervalo indicado en milisegundos.
  tareaTemporizada = setInterval(() => {
    cambiarImagen()
  }, intervaloTiempo * 1000)
}

//--------------------------------------------------------------------------------------------------
//Finalizar tarea temporizada.
function finalizarTareaTemporizada() {
  clearInterval(tareaTemporizada)
}

//--------------------------------------------------------------------------------------------------
//Cambiar la imagen.
function cambiarImagen(){
    indiceImagen++;
    if (indiceImagen >= iconosImagenes.length) {
        indiceImagen = 0;
    }
    for (let i = 0; i < marcadores.length; i++) {
      marcadores[i].setIcon(iconosImagenes[indiceImagen]) //Cambia el ícono del mapa.
      marcadores[i].setMap(mapa)  //Establece el ícono en el mapa.
    }
}

//--------------------------------------------------------------------------------------------------
//Inicio de la aplicación.
let nombreTabla='ElementosUrbanos'
leerRegistros(nombreTabla)
