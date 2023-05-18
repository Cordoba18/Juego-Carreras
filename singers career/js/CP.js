const btn_izquierda = document.querySelector('#btn-izquierda');
const btn_derecha = document.querySelector('#btn-derecha');
const btn_seleccionar = document.querySelector('#btn-seleccionar');

btn_derecha.addEventListener('click', () =>{
    const sonidoboton = new Audio("sonidos/botones.mp3");
    sonidoboton.play();
});
btn_izquierda.addEventListener('click', () =>{
    const sonidoboton = new Audio("sonidos/botones.mp3");
    sonidoboton.play();
});

btn_seleccionar.addEventListener('click', () =>{
    const personaje = document.querySelector('.active');
    const nombre = personaje.querySelector('#nombre').textContent;
    const nombreusuario = document.querySelector('#guardar_nombre_de_usuario').textContent;
    console.log("Soy "+ nombreusuario + " Y tengo el personaje " +  nombre);

    $(document).ready(function() {
        $.ajax({
          url: 'sql/crear_usuario.php',
          type : 'POST',
          data : {username : nombreusuario,
                  personaje : nombre},
          success: function(data) {
            let respuesta = JSON.parse(data);
                if (respuesta[0]['respuesta'] == true) {
                  alert('Usuario CREADO CORRECTAMENTE');
                }else if (respuesta[0]['respuesta'] == false) {
                  alert('Usuario NO CREADO');
                }
           
            
          },
          error: function() {
            alert('Error al obtener los usuarios');
          }
        });
      });
})

