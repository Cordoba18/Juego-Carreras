const div_Start = document.querySelector('.start');
const body = document.querySelector('#BodyStart');
const vista_crear_usuario = document.querySelector('.crear_usuario')
const div_elegir = document.querySelector('.elegir');
const btn_crear_usuario = document.querySelector('#btn_crear_usuario')
const vista_tengo_cuenta = document.querySelector('#vistaloguearse')
const btn_ya_tengo_cuenta = document.querySelector('#btn_ya_tengo_cuenta')
let accion = 'activo'
console.log('hola')
body.addEventListener('keydown', function(e) {
   if (accion == 'activo') {
    const sonidoboton = new Audio("sonidos/botones.mp3");
    sonidoboton.play();
    accion ='inactivo' ;
    setTimeout(function() {
    var audio = new Audio("fondo/speed trap.mp3")
    audio.play();
    audio.volume = 0.3;
},500)
   
     div_Start.setAttribute('hidden', 'true');
     setTimeout(function() {
    div_elegir.removeAttribute('hidden');
  
},2800)
}
})

btn_crear_usuario.addEventListener('click', function(e){
    const sonidoboton = new Audio("sonidos/botones.mp3");
    sonidoboton.play();
    vista_crear_usuario.removeAttribute('hidden')
    div_elegir.setAttribute('hidden', 'true')
    
})
    

btn_ya_tengo_cuenta.addEventListener('click', function(e){
    const sonidoboton = new Audio("sonidos/botones.mp3");
    sonidoboton.play();
    vista_tengo_cuenta.removeAttribute('hidden')
    div_elegir.setAttribute('hidden', 'true')
    
})

