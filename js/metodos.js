function linea(x1, y1, x2, y2) {
    var coor1 = [x1, y1];
    var coor2 = [x2, y2];
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
}

function circulo(x1, y1, x2, y2) {
    var xc = x1;
    var yc = y1;
    var r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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
}

function elipse(x1, y1, x2, y2) {
    var xo, yo, rx2, ry2, p1, p2;
    var xc, yc, rx, ry;
    if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
        rx = Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
        ry = rx / 2;
    } else {
        ry = Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
        rx = ry / 2
    }

    xc = x1;
    yc = y1;
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
}

function poligono(x1, y1, x2, y2, lados) {
    var X = x1;
    var Y = y2;
    var R = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    var L = lados;
    var rad = (2 * Math.PI) / L;
    ctx.beginPath();
    for (var i = 0; i < L; i++) {
        x = X + R * Math.cos(rad * i);
        y = Y + R * Math.sin(rad * i);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
}