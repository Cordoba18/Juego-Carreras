const socket = io();

// DIV_START
const div_Start = document.querySelector('.start');
const body = document.querySelector('#BodyStart');
const btn_crear_usuario = document.querySelector('#btn_crear_usuario');
const div_loguearse = document.querySelector('#vistaloguearse');
const div_personaje = document.querySelector('.crear_personaje');
const div_sala_usuario = document.querySelector('.sala_usuario');
const contenedor1 = document.querySelector('.contenedor-personaje');
const contenedor2 = document.querySelector('.contenedor-vehiculo');
const contenedor3 = document.querySelector('.contenedor-botones');
const div_sala_previa = document.querySelector('.sala_previa');
const div_unirse_sala = document.querySelector('.unirse_sala');
const div_carrera = document.querySelector('.carrera');
const colomnas = document.querySelector('#columnas');
const contenedor_autos = document.querySelector('.contenedor-autos');
const tabla_jugadores = document.querySelector('#columnas-jugadores');
const info_corredor = document.querySelector('#info_corredor');
const div_sala_principal = document.querySelector('.sala_principal');
const div_registrarse = document.querySelector('#vistacrearsesion');
const div_sala_registros = document.querySelector('.sala_registros');
let accion = 'activo';


let musica = "";
let carrera = "";
body.addEventListener('keydown', function (e) {
    if (accion == 'activo') {
        const sonidoboton = new Audio("sonidos/botones.mp3");
        sonidoboton.play();
        accion = 'inactivo';
        setTimeout(function () {
            var audio = new Audio("fondo/speed trap.mp3");
            musica = audio;
            audio.play();
            audio.volume = 0.1;
        }, 500)

        div_Start.setAttribute('hidden', 'true');
        setTimeout(function () {
            div_sala_principal.removeAttribute('hidden');

        }, 2800)
    }
})

/////////////////////////////////////////////////////////

// DIV SALA_PRINCIPAL

 const btnLoguearse = document.querySelector('#btn-loguearse');
 const btnRegistrarse = document.querySelector('#btn-crear-sesion');

 btnLoguearse.addEventListener('click', () =>{
    const sonidoboton = new Audio("sonidos/botones.mp3");
    sonidoboton.play();
    div_sala_principal.setAttribute('hidden', 'true');
    div_loguearse.removeAttribute('hidden');
 })

 btnRegistrarse.addEventListener('click', () =>{

    const sonidoboton = new Audio("sonidos/botones.mp3");
        sonidoboton.play();
        div_sala_principal.setAttribute('hidden', 'true');
        div_registrarse.removeAttribute('hidden');
 })
/////////////////////////////////////////////////////////

// DIV_LOGUARSE

const btn_loguearse = document.querySelector('#boton-loguearse')

let usuario = "";

btn_loguearse.addEventListener('click', function (e) {
    const username = document.querySelector('#input-username-loguearse').value;
    const sonidoboton = new Audio("sonidos/botones.mp3");
        sonidoboton.play();
     usuario = username;
    // emitir_ingreso_usuario(usuario);
    if (username == "") {
        const error_input = document.querySelector('#error-input-loguearse');
        error_input.textContent = "CAMPO VACIO";
        Swal.fire({
            icon: 'error',
            title: 'UY REY',
            text: 'COMPLETA EL CAMPO',
          })  
    }else{
        socket.emit('usuarios:logueo', username);
    }
})

socket.on('server:usuario', function (data){
    if (data.accion == "logueo") {
    if (data.datos == null && data.user == usuario) {
        Swal.fire({
            icon: 'error',
            title: 'ESA CUENTA NO EXISTE',
          })  
    }else
    if (data.datos.nombre_usuario == usuario && data !== null) {
        nombre_personaje = data.datos.personaje;
        div_loguearse.setAttribute('hidden', 'true');
        div_sala_usuario.removeAttribute('hidden');
        setTimeout (function () {
        accion_sala_usuario = true;
        cargarsalausuario(cargar_imagen_personaje(data.datos.personaje), 
            data.datos.nombre_usuario,
             cargarvehiculo(data.datos.personaje),
              data.datos.personaje);
            }, 1000)
    }else if (data.datos.nombre_usuario == usuario && data == null){
        Swal.fire({
            icon: 'error',
            title: 'USUARIO INEXISTENTE',
          })  
    }
}else if (data.accion == "registro") {
    
}
})
//DIV_CREARSE SESION

const btn_registro = document.querySelector('#boton-registrarse')

btn_registro.addEventListener('click', () =>{

    console.log("me presionas")
    const input = document.querySelector('#input-username-registrarse');
    const sonidoboton = new Audio("sonidos/botones.mp3");
    sonidoboton.play();

    if (input.value == "") {
        const error_input = document.querySelector('#error-input-registrarse');
        error_input.textContent = "CAMPO VACIO";
        Swal.fire({
            icon: 'error',
            title: 'UY REY',
            text: 'COMPLETA EL CAMPO',
          })  
    }else{

        usuario = input.value;
        div_personaje.removeAttribute('hidden');
        div_registrarse.setAttribute('hidden', 'true');
        input.value = '';
    }
})

//////////////////////////////////////////////////////////

// DIV_PERSONAJE

const btn_seleccionar = document.querySelector('#btn-seleccionar');
let nombre_personaje = "";
let accion_sala_usuario = false;

btn_seleccionar.addEventListener('click', function (e) {
    const sonidoboton = new Audio("sonidos/botones.mp3");
        sonidoboton.play();

    const personaje = document.querySelector('.active');
    const nombre = personaje.querySelector('#nombre').textContent;
    nombre_personaje = nombre;


    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'PERSONAJE ASIGNADO',
        showConfirmButton: false,
        timer: 1500
    })

    setTimeout(function () {
    div_personaje.setAttribute('hidden', 'true');
    div_sala_principal.removeAttribute('hidden');
    // info_for_sala_usuario(usuario, nombre_personaje);
    socket.emit('usuarios:ingresados', {
        nombre_usuario : usuario,
        personaje : nombre_personaje,
    })
    console.log(usuario);
    // accion_sala_usuario = true;

    }, 2000)

})


let codigo_de_sala = "";


////////////////////////////////////////////////////////

// DIV SALA_USUARIO
const accionsala = setInterval(function () {
if (accion_sala_usuario == true) {
    clearInterval(accionsala);
    const btn_crear_sala = document.querySelector('.btn_crear_sala');
    const btn_unirse_sala = document.querySelector('.btn_unirse_sala');
    const btn_ver_registros = document.querySelector('#btn_ver_registros');

    btn_ver_registros.addEventListener('click', () => {

        socket.emit('usuarios:registros', usuario);
        div_sala_usuario.setAttribute('hidden', true);
        div_sala_registros.removeAttribute('hidden');
    })
    btn_crear_sala.addEventListener('click', () =>{
        const sonidoboton = new Audio("sonidos/botones.mp3");
        sonidoboton.play();
        const codigo_sala = generarAlfanumericoAleatorio();
        codigo_de_sala = codigo_sala;
        const rol = "lider";
        rol_usuario = rol;
        const data = {
            sala : codigo_de_sala,
            nombre_usuario : usuario,
            personaje : nombre_personaje,
            nombre_participantes : [],
            personaje_participantes : [],
        }
        cargarsalaprevia(data);
        socket.emit('usuarios:salas', {
            nombre_usuario: usuario,
            personaje : nombre_personaje,
            sala : codigo_de_sala,
        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'SALA CREADA',
            showConfirmButton: false,
            timer: 1500
    })
        setTimeout(function () {
            div_sala_usuario.setAttribute('hidden', 'true');
            div_sala_previa.removeAttribute('hidden');
        
            }, 2000)
    })
    btn_unirse_sala.addEventListener('click', () =>{
        const sonidoboton = new Audio("sonidos/botones.mp3");
        sonidoboton.play();
        div_sala_usuario.setAttribute('hidden', 'true');
        div_unirse_sala.removeAttribute('hidden');
    })
}
},1000)


////////////////////////////////////////////////////////

//DIV SALA_REGISTROS

const contenedor_usuario_registro = document.querySelector('#contenedor_usuario_registros');
const columnas_registros = document.querySelector('#columnas_registros');
socket.on('server:registros', function(data) {

    if (data.user == usuario) {
        columnas_registros.innerHTML = "";
    contenedor_usuario_registro.innerHTML = "<img src='personajes/Fotos/"+cargar_imagen_personaje(nombre_personaje)+"'>" + "<h1>"+usuario+" </h1>";
    data.datos.forEach(element => {
        if (element.sala == null) {
        
        }else{
        columnas_registros.innerHTML = columnas_registros.innerHTML + "<tr><td>"+element.nombre_usuario +" </td>"+ 
        "<td>"+element.registro_participantes+"</td>"+
        "<td>"+element.registro_top+"</td>" +
        "<td>"+element.sala+"</td></tr>";
        }
    });
}
});

const btn_salir_registros = document.querySelector('#btn_salir_registros');

btn_salir_registros.addEventListener('click', () =>{
    div_sala_registros.setAttribute('hidden', 'true');
    div_sala_usuario.removeAttribute('hidden');
});

//////////////////////////////////////////////
let rol_usuario = "";
//DIV UNIRSESALA

const btn_entrar_sala = document.querySelector('#btn_entrar_sala');


btn_entrar_sala.addEventListener('click', () =>{
    const sonidoboton = new Audio("sonidos/botones.mp3");
        sonidoboton.play();
    const input_code = document.querySelector('#input-codigo-sala').value;
    const rol = "participante";
    rol_usuario = rol;
    codigo_de_sala = input_code;
    // if (salas.indexOf(codigo_de_sala) !== -1) {
        socket.emit('usuarios:salas_unirse', {
            user: usuario,
            personaje : nombre_personaje,
            sala: codigo_de_sala,
        })
        // setTimeout(function () {
        //     div_unirse_sala.setAttribute('hidden', 'true');
        //     div_sala_previa.removeAttribute('hidden');
        //     }, 2000)
    // }else{
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'PAPI LA VERDAD ',
    //         text: 'ESA SALA NO EXISTE',})
    // }
});
let cantidad_jugadores = 0;
let nombre_participantes = [];
let personaje_participantes = [];
////////////////////////////////////////////////////////
socket.on('server:participantes', function(data) {
    if (data.sala_datos == null && data.user == usuario) {
        Swal.fire({
            icon: 'error',
            title: 'UY REY',
            text: 'ESA SALA NO EXISTE PA',
          })  
    }else
    if (data.sala_datos.sala == codigo_de_sala) {
        nombre_participantes = data.sala_datos.nombre_participantes;
        personaje_participantes = data.sala_datos.personaje_participantes;
        div_unirse_sala.setAttribute('hidden', 'true');
        div_sala_previa.removeAttribute('hidden');
        cantidad_jugadores = 0;
        cargarsalaprevia(data.sala_datos);
        nombre_participantes.push(data.sala_datos.nombre_usuario);
        nombre_participantes.reverse();
        personaje_participantes.push(data.sala_datos.personaje);
        personaje_participantes.reverse();
    }

})
//DIV SALA_PREVIA

const btn_salir = document.querySelector('#btn_salir');
const btn_empezar = document.querySelector('#btn_empezar');
btn_salir.addEventListener('click', () =>{
    const sonidoboton = new Audio("sonidos/botones.mp3");
        sonidoboton.play();
    socket.emit('carrera:start', {
        codigo : codigo_de_sala,
        accion : false,
        user : usuario, 
        rol : rol_usuario,
    })
})

btn_empezar.addEventListener('click', () =>{
    const sonidoboton = new Audio("sonidos/botones.mp3");
        sonidoboton.play();
    socket.emit('carrera:start', {
        codigo : codigo_de_sala,
        accion : true,
        rol : "lider",
    })
    
})
////////////////////////////////////////////////////////
let top_usuarios = [];
let top_personajes = [];
let jugadores_totales = 0;
// DIV CARRERA
socket.on('carrera:start', function (data) {
    if (codigo_de_sala == data.codigo && data.accion == true) {
            carrera = true; 
        for (let index = 0; index < nombre_participantes.length; index++) {
                jugadores_totales = jugadores_totales + 1;
        }
    }else if (codigo_de_sala == data.codigo && data.accion == false) {
        nombre_participantes = [];
        personaje_participantes = [];
        estadocarro = "inactivo";
        estadocontador = "inactivo";
        velocidad = 3;
        turbo = "activo";
        carrera = false;
        actividadcarrera = setInterval(correr, 10);
        contenedor_autos.innerHTML = "";
        musica_personaje.pause();
        musica.play();
        if (data.rol == "lider" && data.sala !== "top") {
            div_sala_previa.setAttribute('hidden', 'true');
            div_sala_usuario.removeAttribute('hidden');
        }
        if (data.rol == rol_usuario && data.user == usuario && data.sala !== "top") {
            div_sala_previa.setAttribute('hidden', 'true');
            div_sala_usuario.removeAttribute('hidden');
        }

        if (data.rol == "lider" && data.sala == "top") {
            div_top.setAttribute('hidden', 'true');
            div_sala_usuario.removeAttribute('hidden');
        }
        if (data.rol == rol_usuario && data.user == usuario && data.sala == "top") {
            div_top.setAttribute('hidden', 'true');
            div_sala_usuario.removeAttribute('hidden');
        }
        
    }
     })

const div_top = document.querySelector('.sala_top');
const info_top1 = document.querySelector('.info_usuario_top_1');
const info_top2 = document.querySelector('.info_usuario_top_2');
const info_top3 = document.querySelector('.info_usuario_top_3');
const mensaje_carrera = document.querySelector('.mensaje_carrera');
const cont_top2 = document.querySelector('.contenedor_top2')
const cont_top3 = document.querySelector('.contenedor_top3')
socket.on('carrera:finalizado', function (data) {
     if (codigo_de_sala == data.codigo) {

        info_top1.innerHTML = "";
        info_top2.innerHTML = "";
        info_top3.innerHTML = "";
        cont_top2.setAttribute('hidden', 'true');
        cont_top3.setAttribute('hidden', 'true');
        let contenedor_usuario = document.querySelector('#contenedor_usuario');
        contenedor_usuario.innerHTML = "<img src='personajes/Fotos/"+cargar_imagen_personaje(nombre_personaje) +"'>" +
            "<h1>"+ usuario +"</h1>";
        top_usuarios.push(data.user);
        top_personajes.push(data.personaje);
        
        if (jugadores_totales == 2 && top_usuarios.length === 1) {
            if (rol_usuario == 'lider') {
                const btn_volver_Sala = document.querySelector('#btn_volver_sala');
                btn_volver_Sala.removeAttribute('hidden');}
                if (top_usuarios.indexOf(usuario) !== -1) {
                    mensaje_carrera.innerHTML = "<p> FELICITACIONES QUEDASTE EN EL TOP </p>"
                }else{
                    mensaje_carrera.innerHTML = "<p> MUY MAL APRENDE A MANEJAR </p>"
                }
            info_top1.innerHTML = "<img src='personajes/Fotos/"+ cargar_imagen_personaje(top_personajes[0]) +"' >"+
            "<h2>"+ top_usuarios[0] +"</h2>"
            div_carrera.setAttribute('hidden', 'true');
            div_top.removeAttribute('hidden');
            estadocarro = 'inactivo';
            carrera = false;

            if (data.user == usuario) {
                socket.emit('carrera:registros',{
                    sala : codigo_de_sala,
                    registro_participantes : nombre_participantes,
                    registro_top : top_usuarios,
                })
            }
            top_personajes = [];
            top_usuarios = [];
        }
        else if (jugadores_totales == 3 && top_usuarios.length  === 2) {
            if (rol_usuario == 'lider') {
            const btn_volver_Sala = document.querySelector('#btn_volver_sala');
            btn_volver_Sala.removeAttribute('hidden');}
            if (top_usuarios.indexOf(usuario) !== -1) {
                mensaje_carrera.innerHTML = "<p> FELICITACIONES QUEDASTE EN EL TOP </p>"
            }else{
                mensaje_carrera.innerHTML = "<p> MUY MAL APRENDE A MANEJAR </p>"
            }
            const top_2  = document.querySelector('.contenedor_top2');
            top_2.removeAttribute('hidden');
            info_top1.innerHTML = "<img src='personajes/Fotos/"+ cargar_imagen_personaje(top_personajes[0]) +"' >"+
            "<h2>"+ top_usuarios[0] +"</h2>";
            info_top2.innerHTML = "<img src='personajes/Fotos/"+ cargar_imagen_personaje(top_personajes[1]) +"' >"+
            "<h2>"+ top_usuarios[1] +"</h2>";
            div_carrera.setAttribute('hidden', 'true');
            div_top.removeAttribute('hidden');
            estadocarro = 'inactivo';
            carrera = false;
            if (data.user == usuario) {
                socket.emit('carrera:registros',{
                    sala : codigo_de_sala,
                    registro_participantes : nombre_participantes,
                    registro_top : top_usuarios,
                })
            }
            top_personajes = [];
            top_usuarios = [];
        }else if (jugadores_totales > 3 && top_usuarios.length  === 3) {
            if (rol_usuario == 'lider') {
            const btn_volver_Sala = document.querySelector('#btn_volver_sala');
            btn_volver_Sala.removeAttribute('hidden');}
            if (top_usuarios.indexOf(usuario) !== -1) {
                mensaje_carrera.innerHTML = "<p> FELICITACIONES QUEDASTE EN EL TOP </p>"
            }else{
                mensaje_carrera.innerHTML = "<p> MUY MAL APRENDE A MANEJAR </p>"
            }
            const top_3  = document.querySelector('.contenedor_top3');
            top_3.removeAttribute('hidden');
            const top_2  = document.querySelector('.contenedor_top2');
            top_2.removeAttribute('hidden');
            info_top1.innerHTML = "<img src='personajes/Fotos/"+ cargar_imagen_personaje(top_personajes[0]) +"' >"+
            "<h2>"+ top_usuarios[0] +"</h2>";
            info_top2.innerHTML = "<img src='personajes/Fotos/"+ cargar_imagen_personaje(top_personajes[1]) +"' >"+
            "<h2>"+ top_usuarios[1] +"</h2>";
            info_top3.innerHTML = "<img src='personajes/Fotos/"+ cargar_imagen_personaje(top_personajes[2]) +"' >"+
            "<h2>"+ top_usuarios[2] +"</h2>";
            div_carrera.setAttribute('hidden', 'true');
            div_top.removeAttribute('hidden');

            estadocarro = 'inactivo';
            carrera = false;

            if (data.user == usuario) {
                socket.emit('carrera:registros',{
                    sala : codigo_de_sala,
                    registro_participantes : nombre_participantes,
                    registro_top : top_usuarios,
                })
            }
            top_personajes = [];
            top_usuarios = [];
        }
        }
    })          

socket.on('carrera:carros', function (data) {
    if (usuario == data.user) {
        
    }else if (codigo_de_sala == data.codigo) {
           let carro = document.querySelector('#' + data.user);
           carro.style.left = data.medidas;
           console.log(data.medidas);
     }
    })

    let estadocarro = "inactivo";
    let estadocontador = "inactivo";
    let velocidad =  1;
let turbo = "activo";
let actividadcarrera = setInterval(correr, 10);
function correr() {

   if (carrera == true) {
    console.log('voy a correr');
     clearInterval(actividadcarrera);
     div_sala_previa.setAttribute('hidden', 'true');
     div_carrera.removeAttribute('hidden');
     cargar_carrera();
     const car = document.querySelector('#' + usuario);
     const segundos = document.querySelector('.segundero');
     segundos.innerHTML = "5";
     const contenedor_segundos = document.querySelector('.contador')
     contenedor_segundos.removeAttribute('hidden');

const tdo = document.querySelector('.todo');
tdo.setAttribute('hidden', 'true');



let contador_turbo = document.querySelector('#contador-turbo');

    if (estadocontador === "inactivo") {
        musica.pause();
        const audio = new Audio("sonidos/Cronómetro 5 Segundos.mp3")
        audio.play()
        estadocontador = "activo";
        const cronometro = setInterval(() => {
        let texto = segundos.textContent
        segundos.innerHTML = parseInt(texto) - 1
    }, 1000)
    
    setTimeout(() => {
        clearTimeout(cronometro);
        contenedor_segundos.setAttribute('hidden', 'true')
        estadocarro = "activo";
        audio.pause()
        tdo.removeAttribute('hidden')

    },5500
    )}else{

    }




body.addEventListener('keydown', (e) =>{
    if (estadocarro === "activo") {
        let medida = ""
    const tecla = e.key
    var rect = car.getBoundingClientRect();
    var posicion = {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right
    };
    if (posicionmeta() <= posicion['left']) {
        carrera = false;
        estadocarro = "inactivo";
        Swal.fire({
            title: 'HAS TERMINADO ESPERA QUE LOS DEMAS JUGADORES TERMINEN PARA VER TU POSICIÓN',
            width: 600,
            padding: '3em',
            color: '#716add',
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat
            `
          })
        if (carrera == false) {
            setTimeout(function () {
        socket.emit('carrera:finalizado', {
            codigo : codigo_de_sala,
            user : usuario, 
            personaje : nombre_personaje,
        })
    }, 1000) 
                 
    }
    }else
    if (tecla == "ArrowRight") {
        var left = car.offsetLeft;
        medida = (left + velocidad) +'px';
        car.style.left = medida;
        socket.emit('carrera:carros', {
            codigo : codigo_de_sala,
            user : usuario,
            medidas : medida,
        })
    }else if (tecla == "ArrowLeft") {
        var left = car.offsetLeft;
        medida = (left - velocidad) +'px';
        car.style.left = medida;
        socket.emit('carrera:carros', {
            codigo : codigo_de_sala,
            user : usuario,
            medidas : medida,
        })
    }else if ((tecla == "x" || tecla == "X") && turbo == "activo") {
        turbo = "inactivo";
        contador_turbo.innerHTML = "5";
        const conteo_turbo = setInterval(function(){
          contador_turbo.innerHTML = parseInt(contador_turbo.innerHTML) - 1;  
        }, 1000)
        const sonidoboton = new Audio("sonidos/botones.mp3");
        sonidoboton.play();
        const audio = new Audio("sonidos/Cronómetro 5 Segundos.mp3")
        audio.play();
        audio.volume = 0.3;
        velocidad = 2;
        setTimeout(() => {
            velocidad = 1;
            clearInterval(conteo_turbo);
            contador_turbo.innerHTML = "TURBO ACTIVO"
            turbo = "activo";
        }, 5000);
    }

   

}else{
        console.log("La carrera no ha empezado o ha finalizado");
    }
   
})


function posicionmeta() {
    const meta = document.querySelector('.meta');
    var rect = meta.getBoundingClientRect();
    var posicion = {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right
    };
    console.log(posicion['left'].toFixed())
    return posicion['left'].toFixed();
}
   }
}

////////////////////////////////

// DIV SALA_TOP

const btn_salir_top = document.querySelector('#btn_salir_sala_top');


btn_salir_top.addEventListener('click', (e) => {

    if (rol_usuario == "lider") {
        
        socket.emit('carrera:start', {
            codigo : codigo_de_sala,
            accion : false,
            user : usuario, 
            rol : rol_usuario,
            sala : "top",
        })
    }else{

        socket.emit('carrera:start', {
            codigo : codigo_de_sala,
            accion : false,
            user : usuario, 
            rol : rol_usuario,
            sala : "top",
        })

    }
})

//METODOS
function info_for_sala_usuario(usuario, personaje) {
    
        let imagen = cargar_imagen_personaje(personaje);
        let vehiculo = cargarvehiculo(personaje);
        cargarsalausuario(imagen, usuario, vehiculo, personaje);
    
}

function cargarvehiculo(personaje) {
    if (personaje == 'Arcangel') {
        let vehiculo = "Vehiculo-Arcangel.gif"
        return vehiculo;
    }else 
    if (personaje == 'Karol G') {
        let vehiculo = "Vehiculo-KarolG.gif"
        return vehiculo;
    }
    else 
    if (personaje == 'Rosalia') {
        let vehiculo = "Vehiculo-Rosalia.gif"
        return vehiculo;
    }
    else 
    if (personaje == 'Los Rogelios') {
        let vehiculo = "Vehiculo-Los-Rogelios.gif"
        return vehiculo;
    }
    else 
    if (personaje == 'Shakira') {
        let vehiculo = "Vehiculo-Shakira.gif"
        return vehiculo;
    }
    else 
    if (personaje == 'Feid') {
        let vehiculo = "Vehiculo-Feid.gif"
        return vehiculo;
    }
        
    
}
function cargar_imagen_personaje(personaje) {
    if (personaje == 'Arcangel') {
        let imagen = "Arcangel.png"
        return imagen;
    }else 
    if (personaje == 'Karol G') {
        let imagen = "Karol_G.png"
        return imagen;
    }
    else 
    if (personaje == 'Rosalia') {
        let imagen = "Rosalia.png"
        return imagen;
    }
    else 
    if (personaje == 'Los Rogelios') {
        let imagen = "Los-Rogelios.jpg"
        return imagen;
    }
    else 
    if (personaje == 'Shakira') {
        let imagen = "Shakira.png"
        return imagen;
    }
    else 
    if (personaje == 'Feid') {
        let imagen = "Feid.png"
        return imagen;
    }
        
}

function cargarsalausuario(imagen, username, vehiculo, avatar) {

    contenedor1.innerHTML = "<img src='personajes/Fotos/" + imagen + "'>" +
        "<h1 style='color: white;'>" + username + "</h1>";
    contenedor2.innerHTML = "<img src='personajes/Vehiculos/" + vehiculo + "'>" +
        "<h1 style='color: white;'> Vehiculo de " + avatar + "</h1>"
        ;
    contenedor3.innerHTML = "<button class='btn_crear_sala'>CREAR SALA</button>" +
        "<button class='btn_unirse_sala' >UNIRSE A UNA SALA</button>";
}
function generarAlfanumericoAleatorio() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
  
    for (let i = 0; i < 8; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }
  
    return resultado;
  }

  function cargarsalaprevia(datos) {
    colomnas.innerHTML = "";
    console.log(datos);
    const btn_empezar = document.querySelector('#btn_empezar');
        if (rol_usuario !== "lider") {
            btn_empezar.setAttribute('hidden', 'true');
        }else {
            btn_empezar.removeAttribute('hidden');
        }
        let nombre_lider = document.querySelector("#nombre_lider");
        nombre_lider.innerHTML = "<p>"+ datos.nombre_usuario +"</p>";
        let imagen_lider = document.querySelector('#imagen_lider');
        imagen_lider.innerHTML = "<img src='personajes/Fotos/"+ cargar_imagen_personaje(datos.personaje) +"' alt''>";
        if (rol_usuario == "lider") {
            let limetesalainput = document.querySelector('#limite_sala_input');
            limetesalainput.removeAttribute('hidden');
        }

        let cs = document.querySelector('#codigo_sala');
            cs.innerHTML = datos.sala;

        for (let index = 0; index < datos.nombre_participantes.length; index++) {
            cantidad_jugadores = cantidad_jugadores + 1; 
                    let limetesalatext = document.querySelector('#limite_sala_text');
                    limetesalatext.removeAttribute('hidden');
                    colomnas.innerHTML = colomnas.innerHTML + "<tr>" +
                    "<td>"+datos.nombre_participantes[index] +"</td>" +
                    "<td>"+datos.personaje_participantes[index] +"</td>" +
                    "</tr>";
  }
  let jugadores = document.querySelector('#cantidad_jugadores');
  jugadores.innerHTML = "("+ cantidad_jugadores +")"
}
let musica_personaje = "";
function cargar_carrera() {
    
    contenedor_autos.innerHTML = "";
    tabla_jugadores.innerHTML   = "";
    for (let index = 0; index < nombre_participantes.length; index++) {
        
            if (nombre_participantes[index] !== usuario) {
            tabla_jugadores.innerHTML = tabla_jugadores.innerHTML + "<tr>"+
            "<td>"+ nombre_participantes[index] +"</td> " +
            "<td>"+ personaje_participantes[index] +"</td> " +
            "<td><img id='imagen_competidor' src='personajes/Vehiculos/"+ cargarvehiculo(personaje_participantes[index]) +"'></td> " +
            "</tr>";
            }
            contenedor_autos.innerHTML = contenedor_autos.innerHTML + "<div class='contenedor-carro' ><img class='carro'  id='"+nombre_participantes[index]+
            "' src='personajes/Vehiculos/"+ cargarvehiculo(personaje_participantes[index]) +"' alt=''></div>"

        
    }
    
    const contenido_musica = cargarmusica(nombre_personaje);
    const nombre_cancion = document.querySelector("#cancion");
    nombre_cancion.innerHTML = contenido_musica[1]
    let url_Cancion = "personajes/Canciones/" + contenido_musica[0];
    const musica = new Audio("personajes/Canciones/" + contenido_musica[0]);
    musica_personaje = musica;
    musica.play();
    musica.volume = 0.3;
    let jugadores = nombre_participantes.length ;
    let tamano_meta = jugadores * 100;
    const meta = document.querySelector('.meta');
    meta.style.height = tamano_meta + 'px';

    info_corredor.innerHTML = "<p style='color: white; font-size: 30px'>"+ usuario +"</p><img style='background-color: white;' src='personajes/Vehiculos/"+ cargarvehiculo(nombre_personaje) +"'>";
}
function cargarmusica(personaje) {

    if (personaje == 'Arcangel' || personaje == 'arcangel') {
        let canciones = ["Pa_Que_La_Pases_Bien.mp3", "La_Ruta.mp3"];
        let nombre = ["Pa que la pases bien - Arcangel", "La Ruta - Arcangel"];
        var numeroAleatorio = Math.floor(Math.random() * 2);
        let info_canciones = [canciones[numeroAleatorio], nombre[numeroAleatorio]];
        return info_canciones;
    }else 
    if (personaje == 'Karol G'  || personaje == 'karol G') {
        let canciones = ["Gatubala.mp3", "Provenza.mp3"];
        let nombre = ["Gatubala Karol G", "Provenza Karol G"];
        var numeroAleatorio = Math.floor(Math.random() * 2);
        let info_canciones = [canciones[numeroAleatorio], nombre[numeroAleatorio]];
        return info_canciones;
    }
    else 
    if (personaje == 'Rosalia' || personaje == 'rosalia') {
        let canciones = ["Con_Altura.mp3", "Despecha.mp3"];
        let nombre = ["Con Altura - Rosalia", "Despecha - Rosalia"];
        var numeroAleatorio = Math.floor(Math.random() * 2);
        let info_canciones = [canciones[numeroAleatorio], nombre[numeroAleatorio]];
        return info_canciones;
    }
    else 
    if (personaje == 'Los Rogelios' || personaje == 'los rogelios') {
        let canciones = ["Cualejesa_REMIX.mp3", "Los_Culos_Se_Botan.mp3"];
        let nombre = ["Cualejesa REMIX - Los Rogelios", "Los Cul#s Se Botan - Los Rogelios"];
        var numeroAleatorio = Math.floor(Math.random() * 2);
        let info_canciones = [canciones[numeroAleatorio], nombre[numeroAleatorio]];
        return info_canciones;
    }
    else 
    if (personaje == 'Shakira' || personaje == 'shakira') {
        let canciones = ["Hips_Dont_Like.mp3", "Shakira_Bzp.mp3"];
        let nombre = ["Hips dont like - Shakira", "Shakira Bizzarap - Shakira"];
        var numeroAleatorio = Math.floor(Math.random() * 2);
        let info_canciones = [canciones[numeroAleatorio], nombre[numeroAleatorio]];
        return info_canciones;
    }
    else 
    if (personaje == 'Feid' || personaje == 'feid') {
        let canciones = ["Feliz_Cumpleanos.mp3", "Hey_Mor.mp3"];
        let nombre = ["Feliz Cumpleaños Ferxxo - Feid", "Hey Mor - Feid"];
        var numeroAleatorio = Math.floor(Math.random() * 2);
        let info_canciones = [canciones[numeroAleatorio], nombre[numeroAleatorio]];
        return info_canciones;
    }
    
}
let usuario_registrados = [];
socket.on('usuarios:ingresados', function (data) {
    usuario_registrados.push(data.user);
     })

     /////////////////////////////////////
