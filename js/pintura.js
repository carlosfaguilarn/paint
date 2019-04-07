var color = "#000000";
var tamano = 10;
var pintura = false;
var habilitarLapiz = false;

function pintar(event){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var x = event.clientX;
    var y = event.clientY;

    if(pintura && habilitarLapiz){
        ctx.fillStyle = color;
        ctx.fillRect(x,y,tamano, tamano);  
        console.log("pintar: ("+x+","+y+")");        
    }
}

function quitarLapiz(){
    habilitarLapiz = false;
}

function borrador(){
    pintandoFigura = false;
    document.getElementById("canvas").style.cursor = "url('img/borrador.png'), default";
    color = "#FFFFFF";
    document.getElementById("colores").setAttribute("disabled", "");
}

function lapiz(){
    habilitarLapiz = true;
    pintandoFigura = false;
    document.getElementById("canvas").style.cursor = "url('img/lapiz.png'), default";
    color = document.getElementById("colores").value;
    document.getElementById("colores").removeAttribute("disabled");
}
function scolor(){
    color = document.getElementById("colores").value;
}
function changeColor(color_to_change){
    color = color_to_change
}
function stamano(numero) {
    tamano = numero;
}

function guardari(){
    var canvas = document.getElementById("canvas");
    var imagen = canvas.toDataURL("image/png");
    this.href = imagen;
}
function rango(valor){
    var size = document.getElementById("size");
    size.value = valor;
    tamano = valor;
}