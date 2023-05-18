const btn_submit = document.querySelector('#btn_submit');
btn_submit.addEventListener('click', function(e){
e.preventDefault();
const input_text = document.querySelector('#username').value;
const guardar = document.querySelector('#guardar_nombre_de_usuario');

const sonidoboton = new Audio("sonidos/botones.mp3");
sonidoboton.play();
guardar.innerHTML = input_text;

if (guardar.textContent == "") {
    const error = document.querySelector('#error');
    error.innerHTML = "ESCRIBA UN NOMBRE DE USUARIO";
    error.removeAttribute('hidden');
}else {
$(document).ready(function() {
    $.ajax({
      url: 'sql/exitencia_usuario.php',
      type : 'POST',
      data : {usuario : guardar.textContent},
      success: function(data) {
        let respuesta = JSON.parse(data);
            if (respuesta[0]['respuesta'] == true) {
                const error = document.querySelector('#error');
                error.innerHTML = "EL USUARIO YA EXISTE";
                error.removeAttribute('hidden');
                
            }else if (respuesta[0]['respuesta'] == false) {
                const crear_usuario = document.querySelector('.crear_usuario');
                crear_usuario.setAttribute('hidden', 'true');
                const crear_personaje = document.querySelector('.crear_personaje');
                crear_personaje.removeAttribute('hidden');
                console.log(crear_personaje)
            }
       
        
      },
      error: function() {
        alert('Error al obtener los usuarios');
      }
    });
  });
}

})

const btn_volver = document.querySelector('#btn_volver-CU');

btn_volver.addEventListener('click', function(e){
    e.preventDefault();
    const vistaactual = document.querySelector('.crear_usuario');
    vistaactual.setAttribute('hidden', 'true');
    const vistaelegir = document.querySelector('.elegir');
    vistaelegir.removeAttribute('hidden');
})