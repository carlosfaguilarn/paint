var arreglo = [];
var ladospo = 3;
var ptr = 0;
var mouse = 0;
var current = -1;
window.onload = function() {

    var c = document.getElementById('canvas');
    c.style.backgroundColor = 'lightblue';
    ctx = c.getContext('2d');

    // Center
    ctx.translate(400, 400);

    var cont = 0;
    var x = [];
    var y = [];
    let self = 1


    c.addEventListener('mousedown', function(evt) {
        console.log("mousedown");
        mouse = 1;
        var mousePos = getMousePos(canvas, evt);
        x[0] = (mousePos.x - 408);
        y[0] = (mousePos.y - 290);
        current = current + 1;
        ptr++;

    }, true);
    c.addEventListener('mouseup', function(evt) {
        console.log("mouseup");
        mouse = 0;
        arreglo.splice(ptr, arreglo.length)
        console.log(arreglo.length);
        current = ptr - 1;
    }, false);
    c.addEventListener('mousemove', function mover(evt) {

        if (mouse == 1) {
            var mousePos = getMousePos(canvas, evt);
            x[1] = (mousePos.x - 408);
            y[1] = (mousePos.y - 290);

            var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            if (cual == "lineas") {
                arreglo[current] = ({
                    tipo: "lineas",
                    coor1x: x[0],
                    coor1y: y[0],
                    coor2x: x[1],
                    coor2y: y[1],
                    color: hue,
                    radio: 0
                });

            }
            if (cual == "circulo") {
                arreglo[current] = ({
                    tipo: "circulo",
                    coor1x: x[0],
                    coor1y: y[0],
                    coor2x: x[1],
                    coor2y: y[1],
                    color: hue,
                    radio: 0
                });
            }
            if (cual == "elipse") {
                arreglo[current] = ({
                    tipo: "elipse",
                    coor1x: x[0],
                    coor1y: y[0],
                    coor2x: x[1],
                    coor2y: y[1],
                    color: hue,
                    radio: 0
                });

            }
            if (cual == "poligono") {
                arreglo[current] = ({
                    tipo: "poligono",
                    coor1x: x[0],
                    coor1y: y[0],
                    coor2x: x[1],
                    coor2y: y[1],
                    color: hue,
                    lados: ladospo
                });

            }


            final();
        }


    }, true);

    //sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss


}

function dibujar(comp) {
    cual = comp.id;
    if (cual == "poligono") {
        ladospo = prompt("Ingrese el número de lados", "3");
    }
}

function drawCartesianPoint(ctx, x, y) {
    ctx.fillRect(x, y, 2, 2);
}


function getMousePos(canvas, evt) {
    return {
        x: evt.clientX,
        y: evt.clientY
    };
}

function final() {
    var cnv = document.getElementById('canvas');
    var ctx = cnv.getContext('2d'); // gets reference to canvas context
    ctx.beginPath(); // clear existing drawing paths
    ctx.save(); // store the current transformation matrix

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    ctx.restore(); // restore the transform
    var c = document.getElementById('canvas');
    c.style.backgroundColor = 'lightblue';
    ctx = c.getContext('2d');

    // Center
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    // Add some lines
    var cont = 0;
    var x = [];
    var y = [];
    for (let h = 0; h < ptr; h++) {

        let e = arreglo[h];
        if (e.tipo == "lineas") {
            ctx.fillStyle = e.color;

            var coor1 = [e.coor1x, e.coor1y];
            var coor2 = [e.coor2x, e.coor2y];
            x = [];
            y = [];
            var dX = coor2[0] - coor1[0]
            var dY = coor2[1] - coor1[1]

            var m = (coor2[1] - coor1[1]) / (coor2[0] - coor1[0]);
            var b = coor1[1] - (m * coor1[0])
            var pasos = 0;
            if (Math.abs(dX) > Math.abs(dY)) {
                pasos = Math.abs(dX);
            } else {
                pasos = Math.abs(dY);
            }
            var xI = dX / pasos;
            var yI = dY / pasos;
            drawCartesianPoint(ctx, coor1[0], coor1[1]);
            var x1 = 0;
            var y1 = 0;
            x1 = coor1[0]
            y1 = coor1[1]
            for (let index = 1; index <= pasos; index++) {
                x1 = x1 + xI;
                y1 = y1 + yI;
                drawCartesianPoint(ctx, x1, y1);
            }
        } else if (e.tipo == "circulo") {
            ctx.fillStyle = e.color;
            var xc = e.coor1x;
            var yc = e.coor1y;
            var r = Math.sqrt(Math.pow(e.coor2x - e.coor1x, 2) + Math.pow(e.coor2y - e.coor1y, 2));
            var tx, ty, dt, cc, ss, xe, ye, aux;
            dt = 1 / r;
            cc = Math.cos(dt);
            ss = Math.sin(dt);
            xe = 0;
            ye = r;
            while (ye >= Math.abs(xe)) {
                tx = Math.round(xe);
                ty = Math.round(ye);
                drawCartesianPoint(ctx, xc + tx, yc + ty);
                drawCartesianPoint(ctx, xc - tx, yc + ty);
                drawCartesianPoint(ctx, xc + tx, yc - ty);
                drawCartesianPoint(ctx, xc - tx, yc - ty);
                drawCartesianPoint(ctx, xc + ty, yc + tx);
                drawCartesianPoint(ctx, xc + ty, yc - tx);
                drawCartesianPoint(ctx, xc - ty, yc + tx);
                drawCartesianPoint(ctx, xc - ty, yc - tx);
                aux = xe;
                xe = xe * cc - ye * ss;
                ye = ye * cc + aux * ss;

            }
            x = [];
            y = [];
        } else if (e.tipo == "elipse") {
            ctx.fillStyle = e.color;
            var xo, yo, rx2, ry2, p1, p2;
            var xc, yc, rx, ry;
            if (Math.abs(e.coor2x - e.coor1x) > Math.abs(e.coor2y - e.coor1y)) {
                rx = Math.round(Math.sqrt(Math.pow(e.coor2x - e.coor1x, 2) + Math.pow(e.coor2y - e.coor1y, 2)));
                ry = rx / 2;
            } else {
                ry = Math.round(Math.sqrt(Math.pow(e.coor2x - e.coor1x, 2) + Math.pow(e.coor2y - e.coor1y, 2)));
                rx = ry / 2
            }

            xc = e.coor1x;
            yc = e.coor1y;
            drawCartesianPoint(ctx, xc, yc);
            xo = 0;
            yo = ry;
            rx2 = Math.pow(rx, 2);
            ry2 = Math.pow(ry, 2);
            p1 = ry2 - (rx2 * ry) + (0.25 * rx2);
            while ((ry2 * xo) < (rx2 * yo)) {
                if (p1 < 0) {
                    xo++;
                    p1 = p1 + (2 * ry2 * xo) + ry2;
                } else {
                    xo++;
                    yo--;
                    p1 = p1 + (2 * ry2 * xo) - (2 * rx2 * yo) + ry2;
                }
                drawCartesianPoint(ctx, xc + xo, yc + yo);
                drawCartesianPoint(ctx, xc - xo, yc + yo);
                drawCartesianPoint(ctx, xc + xo, yc - yo);
                drawCartesianPoint(ctx, xc - xo, yc - yo);
            }
            p2 = (ry2) * Math.pow((xo + 0.5), 2) + (rx2) * Math.pow((yo - 1), 2) - (rx2 * ry2);
            while (yo > 0) {
                if (p2 > 0) {
                    yo--;
                    p2 = p2 - (2 * rx2 * yo) + rx2;
                } else {
                    xo++;
                    yo--;
                    p2 = p2 + (2 * ry2 * xo) - (2 * rx2 * yo) + rx2;
                }
                drawCartesianPoint(ctx, xc + xo, yc + yo);
                drawCartesianPoint(ctx, xc - xo, yc + yo);
                drawCartesianPoint(ctx, xc + xo, yc - yo);
                drawCartesianPoint(ctx, xc - xo, yc - yo);
            }
            x = [];
            y = [];
        } else if (e.tipo == "poligono") {
            var X = e.coor1x;
            var Y = e.coor2y;
            var R = Math.sqrt(Math.pow(e.coor2x - e.coor1x, 2) + Math.pow(e.coor2y - e.coor1y, 2));
            var L = e.lados;
            var rad = (2 * Math.PI) / L;
            ctx.beginPath();
            ctx.strokeStyle = e.color;
            for (var i = 0; i < L; i++) {
                x = X + R * Math.cos(rad * i);
                y = Y + R * Math.sin(rad * i);
                ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }

    }

}

function KeyPress(e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey && ptr > 0) {
        ptr--;
        current--;
        final();

    } else if (evtobj.keyCode == 89 && evtobj.ctrlKey && ptr < arreglo.length) {
        ptr++;
        current++;
        final();
    }
}

document.onkeydown = KeyPress;