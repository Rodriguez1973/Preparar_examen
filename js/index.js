let intervaloPosicion = 500
function inicio() {
    const intervalo = setInterval(function () {
        cajavalor.innerText = 'Valor del intervalo:' + intervaloPosicion
        intervaloPosicion = intervaloPosicion + 50000
        movimiento.value = intervaloPosicion
        console.log(intervaloPosicion + '   >  ' + movimiento.max)
        if (intervaloPosicion > movimiento.max) {
            clearInterval(intervalo)
            clearTimeout(time)
            trazarLinea()
        }
    }, 500)
}



// Otra forma de temporizador
var time = null
startTime()
//Reloj
function startTime() {
  var today = new Date()
  var hr = today.getHours()
  var min = today.getMinutes()
  var sec = today.getSeconds()
  ap = hr < 12 ? '<span>AM</span>' : '<span>PM</span>'
  hr = hr == 0 ? 12 : hr
  hr = hr > 12 ? hr - 12 : hr
  //Añade 0 si el valor del tiempo es <10
  hr = chequeaTime(hr)
  min = chequeaTime(min)
  sec = chequeaTime(sec)

  document.getElementById('tiempo').innerHTML =
    hr + ':' + min + ':' + sec + ' ' + ap

  time = setTimeout(function () {
    startTime()
  }, 500)
}

function chequeaTime(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

let nombreTabla='ElementosUrbanos'
let registros=[]
registros=leerRegistros(nombreTabla)

//inicio() //Llamada a la función inicio.