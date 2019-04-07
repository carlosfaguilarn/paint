var c;
var ctx;

window.onload = function() {  
    c = document.getElementById('canvas');
    ctx = c.getContext('2d'); // gets reference to canvas context  

    c.style.backgroundColor = 'white';
    ctx = c.getContext('2d');
    ctx.globalAlpha = 0.95;
    //ctx.translate(-83,-130);
 
    mouse = 0;

    console.log(poligonosRy);
    //dibujarPoligonos();
}

function drawCartesianPoint(ctx, x, y) {
    ctx.fillRect(x, y, 3, 3);
}

function posicion(event){
    var x = event.clientX;
	var y = event.clientY;
    console.log(x);
}

document.onkeydown = keyPress;