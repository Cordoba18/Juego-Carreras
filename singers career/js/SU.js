
    
    const cargar = setInterval(function () {
     const usuario_guardado = document.querySelector('#guardar_nombre_de_usuario').textContent;
     console.log(usuario_guardado);
    if (usuario_guardado === '') {}
    else{
        clearInterval(cargar);
        $(document).ready(function() {
            $.ajax({
              url: 'sql/cargar_datos_usuario.php',
              type : 'POST',
              data : {usuario: usuario_guardado},
              success: function(data) {
                let respuesta = JSON.parse(data);
                console.log(respuesta)
                    if (respuesta[0]['respuesta'] == true) {
                        const contenedor1 = document.querySelector('.contenedor-personaje');
                        contenedor1.innerHTML = "<img src='personajes/Fotos/"+respuesta[0]['imagen']+"'>" +
                        "<h1 style='color: white;'>"+respuesta[0]['username'] + "</h1>" +
                        "<button> CAMBIAR USURIO</button>" +
                        "<button> CAMBIAR PERSONAJE</button>";
                        const contenedor2 = document.querySelector('.contenedor-vehiculo');
                        contenedor2.innerHTML = "<img src='personajes/Vehiculos/"+ respuesta[0]['vehiculo'] +"'>" ;
                        const contenedor3 = document.querySelector('.contenedor-botones');
                        contenedor3.innerHTML = "<button>CREAR SALA</button>" +
                        "<button>UNIRSE A UNA SALA</button>";
                        
                    }else if (respuesta[0]['respuesta'] == false) {
                        
                    }
               
                
              },
              error: function() {
                alert('Error al obtener los usuarios');
              }
            });
          });
    }
}, 1000)