
  //var canvas = document.getElementById("canvas");
  //var limpiar = document.getElementById("limpiar");
  //var ctx = canvas.getContext("2d");
  

  var dibujar = false;
  var factorDeAlisamiento = 5;
  var Trazados = [];
  var puntos = [];

  /*limpiar.addEventListener('click', function(evt) {
    dibujar = false;
    ctx.clearRect(0, 0, cw, ch);
    Trazados.length = 0;
    puntos.length = 0;
  }, false);*/

/*
  canvas.addEventListener('mousedown', function(evt) {
    if(mode == "dibujando") isDraw = true;
    //ctx.clearRect(0, 0, cw, ch);
    puntos.length = 0;
    ctx.beginPath();

  }, false);

  canvas.addEventListener('mouseup', function(evt) {
    redibujarTrazados();
  }, false);
 

  canvas.addEventListener("mousemove", function(evt) {
    if(isDraw) {
      var m = oMousePos(canvas, evt);
      puntos.push(m);
      ctx.lineTo(m.x, m.y);
      ctx.stroke();
    }
  }, false);*/





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
      }
      ctx.quadraticCurveTo(ry[ultimoPunto - 1].x, ry[ultimoPunto - 1].y, ry[ultimoPunto].x, ry[ultimoPunto].y);
      ctx.stroke();
    }
  }


  function redibujarTrazados(){
    isDraw = false;
    ctx.clearRect(0, 0, cw, ch);
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
        y: evt.clientY
    }
  }

