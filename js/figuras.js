var c = document.getElementById("myCanvas");


function Circulo(element){
    var r = distanciaEntreDosPuntos(element.x1, element.y1, element.x2, element.y2);
    ctx.beginPath();
    ctx.arc(element.x1, element.y1, r, 0, 2 * Math.PI);
    
    ctx.lineWidth = element.tamano;
    ctx.fillStyle = element.colorRelleno;
    ctx.strokeStyle = element.colorContorno;

    if(element.front) ctx.globalCompositeOperation = "source-over";
    else ctx.globalCompositeOperation = "destination-over";
    
    //ctx.fill();
    ctx.stroke();
    
    if(element.fill) ctx.fill();
    
}
function Eclipse(element){
    //Eclipse(element.x1, element.y1, element.x2, element.y2, element.rotacion, 0, 2*Math.PI, true); break;
    var rx = Math.abs(element.x2 - element.x1);
    var ry = Math.abs(element.y2 - element.y1);

    ctx.save();
    ctx.beginPath(); 
    ctx.ellipse(element.x1, element.y1, rx, ry, element.rotacion/100*Math.PI/2, 0, 2*Math.PI, true);   

    ctx.lineWidth = element.tamano;
    ctx.fillStyle = element.colorRelleno;
    ctx.strokeStyle = element.colorContorno;
    ctx.stroke();
    if(element.fill) ctx.fill();

} 
function Linea(element){
    ctx.beginPath();
    ctx.moveTo(element.x1, element.y1);
    
    ctx.lineWidth = element.tamano; 
    ctx.strokeStyle = element.colorContorno;
    if(element.front) ctx.globalCompositeOperation = "source-over";
     
    ctx.lineTo(element.x2, element.y2);
    ctx.stroke();
    
}
//function PoligonoRegular(x1, y1, x2, y2, lados, paso, color, fill) {
function PoligonoRegular(element) {
    var L = element.lados;
    var R = distanciaEntreDosPuntos(element.x1, element.y1, element.x2, element.y2);

    var beta = L / 1;
    var rad = (2 * Math.PI) / beta;
    ctx.lineWidth = element.tamano;
    ctx.fillStyle = element.colorRelleno;
    ctx.strokeStyle = element.colorContorno;
    ctx.beginPath();
    for (var i = 0; i < L; i++) {
      x = element.x1 + R * Math.cos(rad * i);
      y = element.y1 + R * Math.sin(rad * i);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    if(element.fill) ctx.fill();
    else ctx.stroke();/*
    console.log("pintando poligono");
    var L = element.lados;
    var R = distanciaEntreDosPuntos(element.x1, element.y1, element.x2, element.y2);

    var beta = L / 0;
    var rad = (2 * Math.PI) / beta;
    ctx.fillStyle = element.color;
    ctx.save();
    ctx.beginPath();
    
    ctx.translate(element.x1,element.y1);

    ctx.rotate(element.rotacion);
    for (var i = 0; i < L; i++) {
      x = element.x1 + R * Math.cos(rad * i);
      y = element.y1 + R * Math.sin(rad * i);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.restore();
    
    if(element.fill) ctx.fill();
    else ctx.stroke(); */
}
function Lapiz(element){  
    ctx.lineTo(element.x1, element.y1);
    ctx.stroke();
}
function distanciaEntreDosPuntos(x1, y1, x2, y2){ 
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}
function puntoMedioRecta(x1, y1, x2, y2){
    var point = {x:'', y:''};
    point.x = (x1+x2)/2;
    point.y = (y1+y2)/2;

    return point;
}
function pintarFigura(element){
    switch(element.tipo){
        case 'circulo': Circulo(element); break;
        case 'linea':   Linea(element); break;
        case 'eclipse': Eclipse(element); break;
        case 'poligonoRegular': PoligonoRegular(element); break;
        case 'lapiz':   Lapiz(element);
    } 
}
/*************      CÓDIGO DE SELECCIÓN DE FIGURAS     ************/

var poligonosRy = [
    {'X':250, 'Y':250,'R':85, 'L':3, 'paso':1, 'color':'#4CD964', 'bool':false},
    {'X':110, 'Y':100,'R':70, 'L':5, 'paso':1, 'color':'#FF9500', 'bool':false},
    {'X':340, 'Y':110,'R':80, 'L':5, 'paso':2, 'color':'#FF3B30', 'bool':false},
    {'X':100, 'Y':280,'R':65, 'L':7, 'paso':2, 'color':'#CC73E1', 'bool':false},
    {'X':400, 'Y':300,'R':75, 'L':8, 'paso':3, 'color':'#1BADF8', 'bool':false}
];

function dibujarPoligonos() {
    for (var i = 0; i < poligonosRy.length; i++) {
      dibujarUnPoligono(poligonosRy[i].X, poligonosRy[i].Y, poligonosRy[i].R, poligonosRy[i].L, poligonosRy[i].paso, poligonosRy[i].color);
    }
}
function rotarFigura(direccion){
    console.log(direccion);

    if(direccion == 'derecha')
        historial[moviendo].rotacion += 1;
    else if(direccion == 'izquierda')
        historial[moviendo].rotacion -= 1;

    restartCanvas(ptr, historial);
}