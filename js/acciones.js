function seleccionarFigura(type) {
    mode = "pintando";
    habilitarLapiz = false;
    isDragging = false;
    isPaiting = false;
    isEscalating = false;

    document.getElementById("canvas").style.cursor = "crosshair";

    tipoFigura = type;
}
function arrastrar(){
    mode = "arrastrando";
    document.getElementById("canvas").style.cursor = "move";
    isDragging = false;
    isPaiting = false;
    isEscalating = false;
    habilitarLapiz = false;
}
function escalar(){
    mode = "escalando"; 
    document.getElementById("canvas").style.cursor = "w-resize";
    isDragging = false;
    isPaiting = false;
    isEscalating = false;
    habilitarLapiz = false;

} 
function rellenar(){
    mode = "rellenando"; 
    document.getElementById("canvas").style.cursor = "url('img/bote.png'), default";
    isDragging = false;
    isPaiting = false;
    isEscalating = false;
    habilitarLapiz = false;
} 
//
function borrador(){
    document.getElementById("canvas").style.cursor = "url('imagenes/goma.png'), default";
    color = "#FFFFFF";
    document.getElementById("colores").setAttribute("disabled", "");
}
//
function lapiz(es_lapiz){ 
    mode = "dibujando"; 
    lapiz = es_lapiz;

    if(es_lapiz == 'lapiz'){
        document.getElementById("canvas").style.cursor = "url('img/lapiz.png'), default";
        color_lapiz = "#000000"; 
    }else{
        document.getElementById("canvas").style.cursor = "url('img/borrador.png'), default";
        color_lapiz = "#FFFFFF";
    }
    console.log(es_lapiz);
    console.log(color_lapiz);        

    isDragging = false;
    isPaiting = false;
    isEscalating = false;
    habilitarLapiz = false;
    tipoFigura = 'lapiz'; 
}
//
function cambiarRelleno(){

} 
function enviar(over){
    isSendingFrontBack = true;
    toFront = over;
    console.log(isSendingFrontBack, toFront);
}