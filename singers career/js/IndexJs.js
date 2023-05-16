const div_Start = document.querySelector('.start');
const body = document.querySelector('#BodyStart');
const vista_crear_usuario = document.querySelector('.crear_usuario')
const div_elegir = document.querySelector('.elegir');
const btn_crear_usuario = document.querySelector('#btn_crear_usuario')
const vista_tengo_cuenta = document.querySelector('.tengocuenta')
const btn_ya_tengo_cuenta = document.querySelector('#btn_ya_tengo_cuenta')

let accion = 'activo'

body.addEventListener('keydown', function(e) {
   if (accion == 'activo') {
    const audio = new Audio("fondo/speed trap.mp3")
    audio.play();
     div_Start.setAttribute('hidden', 'true');
    accion ='inactivo' ;
    div_elegir.removeAttribute('hidden');
}
})

btn_crear_usuario.addEventListener('click', function(e){
    vista_crear_usuario.removeAttribute('hidden')
    div_elegir.setAttribute('hidden', 'true')
    
})
    

btn_ya_tengo_cuenta.addEventListener('click', function(e){
    vista_tengo_cuenta.removeAttribute('hidden')
    div_elegir.setAttribute('hidden', 'true')
    
})