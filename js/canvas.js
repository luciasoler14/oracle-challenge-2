var pantalla = document.querySelector('canvas');
var pincel = pantalla.getContext('2d');

// Dibujar tablero:
function crearTablero() {
    pincel.fillStyle = '#F3F5FC';
    pincel.fillRect(0,0,600,450);
    pincel.lineWidth = 3;  
    pincel.strokeStyle = "#0A3871";
    dibujarBase();
}

// Dibujar ahorcado:
function dibujarBase() {
    pincel.beginPath();
    pincel.moveTo(140,280);
    pincel.lineTo(460,280);
    pincel.stroke();
}

function dibujarPoste() {
    pincel.moveTo(170,280);
    pincel.lineTo(170,3);
    pincel.stroke();
}

function dibujarHorca() {
    pincel.lineTo(170,3);
    pincel.lineTo(420,3);
    pincel.lineTo(420,50);
    pincel.stroke();
}

function dibujarCabeza() {
    pincel.beginPath();
    pincel.arc(420,70,22,0,2*Math.PI,false);
    pincel.stroke();
}

function dibujarTorso() {
    pincel.beginPath();
    pincel.moveTo(420,90);
    pincel.lineTo(420,190);
    pincel.stroke();
}

function dibujarPieI() {
    pincel.beginPath();
    pincel.moveTo(420,190);
    pincel.lineTo(450,240);
    pincel.stroke();
}

function dibujarPieD() {
    pincel.beginPath();
    pincel.moveTo(420,190);
    pincel.lineTo(390,240);
    pincel.stroke();
}

function dibujarBrazoI() {
    pincel.beginPath();
    pincel.moveTo(420,120);
    pincel.lineTo(450,170);
    pincel.stroke();
}

function dibujarBrazoD() {
    pincel.beginPath();
    pincel.moveTo(420,120);
    pincel.lineTo(390,170);
    pincel.stroke();
}

// Dibujar guiones:
function dibujarGuiones() {
    var inicioY = 380;
    var centroX = 245;
    var espesor = 4;
    var anchoGuion = 50;
    var separacionGuion = 10;
    var guion = (anchoGuion + separacionGuion);
    var numeroDeGuiones = palabraSecreta.length;
    var inicioX = centroX - ((guion * numeroDeGuiones) / 2);
    
    for (var i=0; i<numeroDeGuiones; i++) {  
        pincel.fillStyle = "#0A3871";
        inicioX += guion; 
        pincel.fillRect(inicioX, inicioY, anchoGuion, espesor);      
    }
};

// Dibujar mensajes:
function dibujarMensajeGanador() {
    pincel.fillStyle = "#019267";
    pincel.font = "35px Inter";
    pincel.fillText("GANASTE :)",190,120);
    pincel.font = "28px Inter";
    pincel.fillText("¡Felicidades!",200,170);
};

function dibujarMensajePerdedor() {
    pincel.fillStyle = "#D82148";
    pincel.font = "35px Inter";
    pincel.fillText("PERDISTE :(",190,120);
    pincel.font = "20px Inter";
    pincel.fillText("La palabra era:",215,170);
    pincel.font = "28px Inter";
    pincel.fillText(palabraSecreta,215,210);
};
