// Lista de palabras:
var listaDePalabras = ['AMBITO','CLASE','ARRAY','BINARIO','BLOQUE','BOOLEANO','LOGICA','INTERFAZ','METODO','OBJETO','DATO','VARIABLE','VALOR','PROGRAMA','LENGUAJE','CODIGO','ETIQUETA','LIBRERIA','DOMINIO','SERVIDOR','NUBE','OPERADOR','FUNCION','MAQUINA','SIMBOLO','USUARIO','INTERNET','COMPILAR'];

// Definición de Variables:
var juegoIniciado = false;
var contador = 0;
var palabraSecreta = '';
var letraIngresada = '';
var arrayLetrasAcertadas = [];
var arrayLetrasErradas = [];

// Botones:
var btnIniciarJuego = document.querySelector('#iniciar-juego');
var btnAgregarPalabra = document.querySelector('#agregar-palabra');
var btnNuevoJuego = document.querySelector('#nuevo-juego');
var btnDesistir = document.querySelector('#desistir');
var btnGuardarEmpezar = document.querySelector('#guardar-empezar');
var btnCancelar = document.querySelector('#cancelar');

var inputPalabra = document.querySelector('#input-nueva-palabra');

// Cambio de Vistas:
var inicio = document.querySelector(".inicio");
var palabraNueva = document.querySelector(".palabraNueva");
var juego = document.querySelector(".juego");

// inicio.classList.add("oculto");
palabraNueva.classList.add("oculto");
juego.classList.add("oculto");

// Eventos Botones:
btnIniciarJuego.addEventListener("click", function() {
    inicio.classList.add("oculto");
    juego.classList.remove("oculto");
    iniciarJuego();
    dibujarLetraAcertada();
});

btnAgregarPalabra.addEventListener("click", function() {
    inicio.classList.add("oculto");
    palabraNueva.classList.remove("oculto");
    juego.classList.add("oculto");
    input.focus();
});

btnNuevoJuego.addEventListener("click", function() {
    inicio.classList.add("oculto");
    palabraNueva.classList.add("oculto");
    iniciarJuego();
});

btnDesistir.addEventListener("click", function() {
    location.reload();
    palabraNueva.classList.add("oculto");
    inicio.classList.remove("oculto");
    juego.classList.add("oculto");
});

btnGuardarEmpezar.addEventListener("click", function() {
    verificarPalabra();
    if (juegoIniciado) {
        palabraNueva.classList.add("oculto");
        juego.classList.remove("oculto");
        iniciarJuego();
    }
});

btnCancelar.addEventListener("click", function() {
    palabraNueva.classList.add("oculto");
    inicio.classList.remove("oculto");
});

// Funciones:
function iniciarJuego() {
    crearTablero();
    escogerPalabra();
    dibujarGuiones();
    limpiarLetras();
    juegoIniciado = true;
};

function limpiarLetras() {
    arrayLetrasAcertadas = [];
    arrayLetrasErradas = [];
};

function escogerPalabra() {
    var p = Math.floor(Math.random()*listaDePalabras.length);
    palabraSecreta = listaDePalabras[p];
    cantidadLetras = palabraSecreta.length;
    return palabraSecreta;
};

function verificarPalabra() {
    var palabraIngresada = input.value.toUpperCase().trim();
    var restriccion = new RegExp(/^[A-Z]*$/);
    juegoIniciado = false;
    if (palabraIngresada === '') {
        alert('El campo está vacío');
    } else if (palabraIngresada.length > 8) {
        alert('Máximo 8 caracteres');
    } else if (!restriccion.test(palabraIngresada)) {
        alert('Sólo letras mayúsculas, sin espacios');
    } else if (listaDePalabras.indexOf(palabraIngresada) >= 0) {
        alert('Palabra ya ingresada. Seleccione otra palabra');
    } else {
        juegoIniciado = true;
        agregarPalabra();
    }
    limpiarFormulario();
};

function agregarPalabra() {
    var palabraIngresada = input.value.toUpperCase().trim();
    if(juegoIniciado) {
        listaDePalabras.push(palabraIngresada);
        alert('¡Palabra ingresada con éxito!');
        juegoIniciado = true;
        return listaDePalabras;
    }
};

function limpiarFormulario() {
    document.getElementById("input").value = "";
};

// Teclas:
document.addEventListener("keydown", function(event) {
    if(juegoIniciado) {
        var restriccion = new RegExp(/^[A-Z]*$/);
        letraIngresada = event.key
        if(!restriccion.test(letraIngresada)) {
            alert('Sólo letras mayúsculas');
        } else {
            letrasRepetidasCorrectas();
            letrasRepetidasIncorrectas();
        }
    }
});

function letrasRepetidasCorrectas() {
    if(!arrayLetrasAcertadas.includes(letraIngresada)) {
        for(var i=0; i<palabraSecreta.length; i++) {
            if(palabraSecreta[i].match(letraIngresada)) {
                arrayLetrasAcertadas.push(letraIngresada);
                dibujarLetraAcertada();
            }
        }
    }
};

function dibujarLetraAcertada() {
    for(var i=0; i<palabraSecreta.length; i++) {
        if (letraIngresada == palabraSecreta[i]) {
            var inicioY = 360;
            var centroX = 295 - (60 * (palabraSecreta.length / 2));
            palabraSecreta[i].replace(i, letraIngresada);
            pincel.fillStyle = "#0A3871";
            pincel.font = "46px Inter";
            pincel.fillText(palabraSecreta[i], centroX + 60 * i, inicioY);
        }
        if (arrayLetrasAcertadas.length == palabraSecreta.length) {
            juegoIniciado = false;
            dibujarMensajeGanador();
        }
    }
};

function letrasRepetidasIncorrectas() {
    if (!palabraSecreta.includes(letraIngresada) && contador < 8 && !arrayLetrasErradas.includes(letraIngresada)) { 
        arrayLetrasErradas.push(letraIngresada);
        dibujarLetraErrada();
        dibujarAhorcado();
    }     
};

function dibujarLetraErrada() {
    var inicioX = 190;
    var inicioY = 430;
    for(i=0; i<arrayLetrasErradas.length; i++) {
        pincel.fillStyle = "grey";
        pincel.font = "24px Inter";
        pincel.fillText(arrayLetrasErradas[i], inicioX + 30 * i, inicioY);
    }
};

function dibujarAhorcado() {
    var contador = arrayLetrasErradas.length;
    if (contador === 1) {
        dibujarPoste();
    } else if (contador === 2) {
        dibujarHorca();
    } else if (contador === 3) {
        dibujarCabeza();
    } else if (contador === 4) {
        dibujarTorso();
    } else if (contador === 5) {
        dibujarPieI();
    } else if (contador === 6) {
        dibujarPieD();
    } else if (contador === 7) {
        dibujarBrazoI();
    } else if (contador === 8) {
        dibujarBrazoD();
        juegoIniciado = false;
        dibujarMensajePerdedor();
    }
};
