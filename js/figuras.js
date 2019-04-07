var c = document.getElementById("myCanvas");


function Circulo(x1, y1, x2, y2){
    var r = distanciaEntreDosPuntos(x1, y1, x2, y2);
    ctx.beginPath();
    ctx.arc(x1, y1, r, 0, 2 * Math.PI);
    ctx.stroke();
}
function Eclipse(){
    ctx.beginPath();
    //context.ellipse(X, Y, rX, rY, ar, ap, af, cR);
    ctx.stroke();
}


function distanciaEntreDosPuntos(x1, y1, x2, y2){ 
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}