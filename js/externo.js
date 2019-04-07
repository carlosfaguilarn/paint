var historial = [];
var ptr = 0; 

var temp_x = [0, 0];
var temp_y = [0, 0];


var tipoFigura;

var isPaiting = false;
var isDragging = false;

var mode = 'none';
/* Variables del código de selección */
var delta = new Object();
/* Fin de variables*/

var c = document.getElementById("canvas");

function obtener(event) {
    console.log("Punto de origen");  
    if(primerClick){
        xx = event.clientX;
        yy = event.clientY;
        primerClick = false;
    }else{
        console.log("Punto de destino");
        if(tipo == 'linea'){
            linea(xx, yy, event.clientX, event.clientY);
        } 
        if(tipo == 'circulo'){
            circulo(xx, yy, event.clientX, event.clientY);
        } 
        if(tipo == 'elipse'){
            elipse(xx, yy, event.clientX, event.clientY);
        }
        historial[ptr] = {
            'tipo' : tipo,
            'x1': xx,
            'y1': yy,
            'x2': event.clientX,
            'y2': event.clientY,
            'color': color
        };

        xx=0; yy=0;
        primerClick = true;
        ptr++; 
    }
}

function seleccionarFigura(type) {
    mode = "dibujando";
    habilitarLapiz = false;
    isDragging = false;
    isPaiting = false;

    document.getElementById("canvas").style.cursor = "crosshair";

    tipoFigura = type;
}
function arrastrar(){
    mode = "arrastrando";
    isDragging = false;
    isPaiting = false;
    habilitarLapiz = false;
}

//
function borrador(){
    document.getElementById("canvas").style.cursor = "url('imagenes/goma.png'), default";
    color = "#FFFFFF";
    document.getElementById("colores").setAttribute("disabled", "");
}

//
function lapiz(){
    document.getElementById("canvas").style.cursor = "url('imagenes/lapiz-con-goma.png'), default";
    color = document.getElementById("colores").value;
    document.getElementById("colores").removeAttribute("disabled");
}
//
function scolor(){
    color = document.getElementById("colores").value;
}
//
function stamano(numero) {
    tamano = numero;
}
//
function guardari(){
    var canvas = document.getElementById("canvas");
    var imagen = canvas.toDataURL("image/png");
    this.href = imagen;
}
//
function main(){
    if(contador = 0){
        pintado
    }else{

    }
}

function keyPress(e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey && ptr > 0) {
        ptr--;
        restartCanvas(ptr, historial);
    } else if (evtobj.keyCode == 89 && evtobj.ctrlKey && ptr < historial.length) {
        ptr++;
        restartCanvas(ptr, historial);
    }
}


function restartCanvas(_ptr, _historial){
    var cnv = document.getElementById('canvas');
    var ctx = cnv.getContext('2d'); // gets reference to canvas context  
    ctx.clearRect(0,0, cnv.width+80, cnv.height+130);  
    
    for (let i = 0; i < _ptr; i++) {
        const element = _historial[i];
        switch(element.tipo) {
            case "linea":
                linea(element.x1, element.y1, element.x2, element.y2);  
                break; 
            case "circulo":
                Circulo(element.x1, element.y1, element.x2, element.y2);  
                break; 
            default:
                break;
        } 
    } 

}
function getMousePos(canvas, evt) {
    return {
        x: evt.clientX,
        y: evt.clientY
    };
}


/************************************** FIGURAS DINÄMICAS ***************************/
//document.getElementById("guardarPNG").addEventListener("click", guardarPNG, false);
//document.getElementById("guardarPPS").addEventListener("click", guardarPPS, false);

function mouseDown(evt){
    var mousePos = oMousePos(c, evt);

    if(mode == "arrastrando") isDragging = true;
    else if(mode == "dibujando") isPaiting = true;
    
    if(isDragging) {
        for (var i = 0; i < poligonosRy.length; i++) {
            //dibujarUnPoligono(X,Y,R,L,paso,color)
            dibujarUnPoligono(poligonosRy[i].X, poligonosRy[i].Y, poligonosRy[i].R, poligonosRy[i].L, poligonosRy[i].paso, poligonosRy[i].color);
            
            if (ctx.isPointInPath(mousePos.x, mousePos.y)) {
                poligonosRy[i].bool = true;
                delta.x = poligonosRy[i].X - mousePos.x;
                delta.y = poligonosRy[i].Y - mousePos.y;
                break;
            } else {
                poligonosRy[i].bool = false;
            }
        }
    
        ctx.clearRect(0, 0, c.width, c.height);
        dibujarPoligonos();
    }else if(isPaiting){
        temp_x[0] = mousePos.x;
        temp_y[0] = mousePos.y;      
    }
}

function mouseUp() {  
    if(isDragging){
        for (var i = 0; i < poligonosRy.length; i++) {
            poligonosRy[i].bool = false
        }
    }else if(isPaiting){ 
        historial[ptr] = {
            'tipo' : tipoFigura,
            'x1': temp_x[0],
            'y1': temp_y[0],
            'x2': temp_x[1],
            'y2': temp_y[1],
            'color': color
        }; 
        ptr++;     
        console.log(historial);
    }
    ctx.clearRect(0, 0, c.width, c.height); 
    restartCanvas(ptr, historial);
    dibujarPoligonos();
    
    isDragging = false;
    isPaiting = false;
}

function mouseMove(evt) {
    var mousePos = oMousePos(c, evt);
    if(isDragging) {
        for (var i = 0; i < poligonosRy.length; i++) {
          if (poligonosRy[i].bool) {
            ctx.clearRect(0, 0, c.width, c.height);
            X = mousePos.x + delta.x, Y = mousePos.y + delta.y
            poligonosRy[i].X = X;
            poligonosRy[i].Y = Y;
            break;
          }
        }
        dibujarPoligonos();
    }else if(isPaiting){
        restartCanvas(ptr, historial);
        dibujarPoligonos();
        temp_x[1] = mousePos.x;
        temp_y[1] = mousePos.y;
        switch(tipoFigura){
            case 'circulo': Circulo(temp_x[0], temp_y[0], temp_x[1], temp_y[1]); break;
            case 'linea':   linea(temp_x[0], temp_y[0], temp_x[1], temp_y[1]); break;
        }
    }
}

/*************      CÓDIGO DE SELECCIÓN DE FIGURAS     ************/
function oMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return { // devuelve un objeto
      x: Math.round(evt.clientX - rect.left),
      y: Math.round(evt.clientY - rect.top)
    };
}
var poligonosRy = [
    {'X':250, 'Y':250,'R':85, 'L':3, 'paso':1, 'color':'#4CD964', 'bool':false},
    {'X':110, 'Y':100,'R':70, 'L':5, 'paso':1, 'color':'#FF9500', 'bool':false},
    {'X':340, 'Y':110,'R':80, 'L':5, 'paso':2, 'color':'#FF3B30', 'bool':false},
    {'X':100, 'Y':280,'R':65, 'L':7, 'paso':2, 'color':'#CC73E1', 'bool':false},
    {'X':400, 'Y':300,'R':75, 'L':8, 'paso':3, 'color':'#1BADF8', 'bool':false}
];
function dibujarUnPoligono(X, Y, R, L, paso, color) {
    var beta = L / paso;
    var rad = (2 * Math.PI) / beta;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (var i = 0; i < L; i++) {
      x = X + R * Math.cos(rad * i);
      y = Y + R * Math.sin(rad * i);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
}
function dibujarPoligonos() {
    for (var i = 0; i < poligonosRy.length; i++) {
      dibujarUnPoligono(poligonosRy[i].X, poligonosRy[i].Y, poligonosRy[i].R, poligonosRy[i].L, poligonosRy[i].paso, poligonosRy[i].color);
    }
}