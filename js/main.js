var c;
var ctx;
window.onkeypress = function(event){
    var lados = document.getElementById("lados"); 
    if (Number.isInteger(Number.parseInt(event.key))) {
        lados.innerHTML = event.key;
    }else if(event.keyCode == 43){
        lados.innerHTML = Number.parseInt(lados.innerHTML)+1; 
    }else if(event.keyCode == 45){
        lados.innerHTML = Number.parseInt(lados.innerHTML)-1; 
    } 
}

window.onload = function() {  
    c = document.getElementById('canvas');
    ctx = c.getContext('2d'); // gets reference to canvas context  
    c.style.backgroundColor = 'white';
    ctx = c.getContext('2d');
    ctx.globalAlpha = 0.95;
    /*Lapiz({
        'x1': 100,
        'y1': 100,
        'x2': 150,
        'y2': 150
    });*/
    document.getElementById("guardarPNG").addEventListener("click", guardarPNG, false);
    document.getElementById("guardarPPS").addEventListener("click", guardarPPS, false);
     
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