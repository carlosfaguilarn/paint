var MAX_BYTES = 102400; // 100 KB 

// Método para guardar el canvas en formato PNG
function guardarPNG(){
    var elem = document.getElementById('guardarPNG');
    var nombre = prompt("Nombre del archivo: ");
    if(nombre != null){
        elem.download = nombre + ".png";
        var canvas = document.getElementById("canvas");
        var imagen = canvas.toDataURL("image/png");
        this.href = imagen;
    }else{
        alert("Ingresa un nombre válido");
    }
    
}
//Método para guardar el canvas en formato JSON
function guardarPPS(){
    var contenidoDeArchivo = JSON.stringify(historial);
    var elem = document.getElementById('guardarPPS');
    var nombre = prompt("Nombre del archivo: ");
    if(nombre != null){
        elem.download = nombre + ".txt";
        elem.href = "data:application/octet-stream," + encodeURIComponent(contenidoDeArchivo);
    }else{
        alert("Ingresa un nombre válido");
    }
    
}

// Método par leer un archivo JSON
function filesInfo(event) { 
    if (!(window.File)) {
        console.log('La API File no está soportada');
        return;
    } 
    var file;
    var reader;
    var files = document.getElementById('file-5').files; 
    for (var i = 0; i < files.length; i++) {
        file = files[i];
        reader = new FileReader();
        reader.onloadend = onFileLoaded;
        reader.readAsBinaryString(file);
    }
}

function onFileLoaded(event) {
    var archivo = JSON.parse(event.currentTarget.result.substr(0, MAX_BYTES));
    console.log(archivo); 

    restartCanvas(archivo.length, archivo);
}