
const btn_logueo = document.querySelector('#boton-loguearse');
const texto_error = document.querySelector('#error-input');
btn_logueo.addEventListener('click', function(e){
    e.preventDefault();
    const sonidoboton = new Audio("sonidos/botones.mp3");
    sonidoboton.play();
    const input_username = document.querySelector('#input-username').value;

    if (input_username == "") {
        texto_error.innerHTML = "ERROR CAMPO VACIO";
    }else{

        $(document).ready(function() {
            $.ajax({
              url: 'sql/exitencia_usuario.php',
              type : 'POST',
              data : {usuario : input_username},
              success: function(data) {
                let respuesta = JSON.parse(data);
                    if (respuesta[0]['respuesta'] == true) {
                        alert('LOGUEADO')
                        texto_error.innerHTML = "LOGUEADO";
                        
                    }else if (respuesta[0]['respuesta'] == false) {
                        texto_error.innerHTML = "NO EXITE";
                    }
               
                
              },
              error: function() {
                alert('Error al obtener los usuarios');
              }
            });
          });
    }
})


const btn_volver = document.querySelector('#btn_volver_loguearse');
btn_volver.addEventListener('click', function(e){
    e.preventDefault();
    const vistaactual = document.querySelector('#vistaloguearse');
    vistaactual.setAttribute('hidden', 'true');
    const vistaelegir = document.querySelector('.elegir');
    vistaelegir.removeAttribute('hidden');
})
