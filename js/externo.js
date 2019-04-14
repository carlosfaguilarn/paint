var historial = [];
var ptr = 0; 

var temp_x = [0, 0];
var temp_y = [0, 0];

var tipoFigura;

var isPaiting = false;
var isDragging = false;
var isEscalating = false;
var isDraw = false;
var isFill = false;

var toFront = false;
var toBack = false;

var isSendingFrontBack = false;

var mode = 'none'; 
var delta = new Object();  
var moviendo = 0;
/*
variables para el trazado a mano alzada 
*/
var dibujar = false;
  var factorDeAlisamiento = 5;
  var Trazados = [];
  var puntos = [];


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
        pintarFigura(element);
    } 
    redibujarTrazados();
}
function getMousePos(canvas, evt) {
    return {
        x: evt.clientX,
        y: evt.clientY
    };
}
/************************************** FIGURAS DINÄMICAS ***************************/

function mouseDown(evt){
    var mousePos = oMousePos(c, evt);
    switch(mode){
        case "arrastrando": isDragging = true; break;
        case "pintando": isPaiting = true; break;
        case "escalando": isEscalating = true; break;
        case "dibujando": isDraw = true; break;
        case "rellenando": isFill = true; break;
    } 
    
    if(isDragging || isEscalating || isFill) {
        var pintoSobreCanvas = true;
        moviendo = 0;
        var escalando = 0;
        var pintando = 0;
        for (var i = 0; i < historial.length; i++) {
            pintarFigura(historial[i]);
            if(ctx.isPointInPath(mousePos.x-83, mousePos.y-130)) {
                //Seleccionar el actual para tomar al último
                if(isDragging) moviendo = i; 
                if(isEscalating) escalando = i;
                if(isFill) pintando = i;
                pintoSobreCanvas = false;

                if(isSendingFrontBack){
                    historial[i].front = toFront;
                    isSendingFrontBack = false;
                }
                console.log("Detecté una figura");
                //break;
            }else{
                historial[i].move = false;
                historial[i].scale = false;
            }
        }
        if(isDragging)   historial[moviendo].move = true;
        if(isEscalating) historial[escalando].scale = true;
        if(isFill){
            historial[pintando].fill = true;
            historial[pintando].colorContorno = colorC;
            historial[pintando].colorRelleno  = colorR;
        }  

        delta.x1 = historial[moviendo] .x1 - mousePos.x;
        delta.y1 = historial[moviendo].y1 - mousePos.y;

        delta.x2 = historial[moviendo].x2 - mousePos.x;
        delta.y2 = historial[moviendo].y2 - mousePos.y; 
            // Si no pintó sobre figura (pintó el fondo) y entró al ciclo
        if(pintoSobreCanvas && isFill){ 
            c.style.backgroundColor = colorR;
            console.log("Pintando fondo");
            console.log("pinto sobre canvas: " + pintoSobreCanvas);
            console.log("is Fill: " + isFill);
        }
        restartCanvas(ptr, historial);
    }else if(isPaiting){
        temp_x[0] = mousePos.x;
        temp_y[0] = mousePos.y;      
    }else if(isDraw){ 
        //Dibujar lápiz
        puntos.length = 0;
        ctx.beginPath();
    }
    toFront = true;
}

function mouseUp() {  
    console.log(historial);
    if(isDragging){
        for (var i = 0; i < historial.length; i++) {
            historial[i].move = false;
            historial[i].scale = false;
        }
    }else if(isPaiting){  
        historial[ptr] = {
            'tipo' : tipoFigura,
            'x1': temp_x[0],
            'y1': temp_y[0],
            'x2': temp_x[1],
            'y2': temp_y[1],
            'colorContorno': colorC,
            'colorRelleno': colorR,
            'tamano': tamano,
            'lados': document.getElementById("lados").innerHTML,
            'move': false,
            'scale': false,
            'fill': !document.getElementById("ckeck_relleno").checked,
            'front': toFront,
            'rotacion': 0
        }; 
        ptr++;     
    } else if(isDraw){
        redibujarTrazados();
    }
    
    restartCanvas(ptr, historial);  
    isDragging = false;
    isPaiting = false;
    isEscalating = false;
    isDraw = false;
    isFill = false;
}

function mouseMove(evt) {
    var mousePos = oMousePos(c, evt);
    if(isDragging) {
        for (var i = 0; i < historial.length; i++) {
          if (historial[i].move) {
            ctx.clearRect(0, 0, c.width, c.height);
            X1 = mousePos.x + delta.x1; 
            Y1 = mousePos.y + delta.y1;

            X2 = mousePos.x + delta.x2; 
            Y2 = mousePos.y + delta.y2; 

            historial[i].x1 = X1;
            historial[i].y1 = Y1;

            historial[i].x2 = X2;
            historial[i].y2 = Y2;
            break;
          }
        } 
        restartCanvas(ptr, historial);
    }else if(isPaiting){
        restartCanvas(ptr, historial); 
        temp_x[1] = mousePos.x;
        temp_y[1] = mousePos.y;

        pintarFigura({
            'tipo' : tipoFigura,
            'x1': temp_x[0],
            'y1': temp_y[0],
            'x2': temp_x[1],
            'y2': temp_y[1],
            'colorContorno': colorC,
            'colorRelleno': colorR,
            'tamano': tamano,
            'lados': document.getElementById("lados").innerHTML,
            'fill': !document.getElementById("ckeck_relleno").checked,
            'move': false,
            'scale': false,
            'front': toFront,
            'rotacion': 0
        });
            
    }else if(isEscalating){
        for (var i = 0; i < historial.length; i++) {
            if (historial[i].scale) {
                ctx.clearRect(0, 0, c.width, c.height);
                historial[i].x2 = mousePos.x;
                historial[i].y2 = mousePos.y;
                break;
            }
        }  
        restartCanvas(ptr, historial);
    }if(isDraw){ 
        //Moviendo el lapiz dibujando
        var m = oMousePos(canvas, evt);
        puntos.push(m);
        ctx.lineWidth = tamano;
        ctx.strokeStyle = colorR;
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
    }
}


//MANO ALZADA

function reducirArray(n,elArray) {
    var nuevoArray = [];
    nuevoArray[0] = elArray[0];
    for (var i = 0; i < elArray.length; i++) {
      if (i % n == 0) {
        nuevoArray[nuevoArray.length] = elArray[i];
      }
    }
    nuevoArray[nuevoArray.length - 1] = elArray[elArray.length - 1];
    Trazados.push(nuevoArray);
  }

  function calcularPuntoDeControl(ry, a, b) {
    var pc = {}
    pc.x = (ry[a].x + ry[b].x) / 2;
    pc.y = (ry[a].y + ry[b].y) / 2;
    return pc;
  }

  function alisarTrazado(ry) {
    if (ry.length > 1) {
      var ultimoPunto = ry.length - 1;
      ctx.beginPath();

      
      ctx.moveTo(ry[0].x, ry[0].y);
      for (i = 1; i < ry.length - 2; i++) {
        var pc = calcularPuntoDeControl(ry, i, i + 1);
        ctx.quadraticCurveTo(ry[i].x, ry[i].y, pc.x, pc.y);
        ctx.lineWidth = ry[i].tamano;
        ctx.strokeStyle = ry[i].color;
      }
      ctx.quadraticCurveTo(ry[ultimoPunto - 1].x, ry[ultimoPunto - 1].y, ry[ultimoPunto].x, ry[ultimoPunto].y);
      ctx.stroke();
    }
  }


  function redibujarTrazados(){
    isDraw = false;
    reducirArray(factorDeAlisamiento,puntos);
    for(var i = 0; i < Trazados.length; i++)
    alisarTrazado(Trazados[i]);
  }

  function oMousePos(c, evt) {
    //var ClientRect = c.getBoundingClientRect();
     
    return { //objeto
        //x: Math.round(evt.clientX - ClientRect.left),
        //y: Math.round(evt.clientY - ClientRect.top)
        x: evt.clientX,
        y: evt.clientY,
        color: colorR,
        tamano: tamano
    }
  }

