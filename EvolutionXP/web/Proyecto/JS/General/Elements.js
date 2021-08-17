


function addElementTramites(data) {

    return '' +
            '<div key=' + data.key + ' class="content-item-tramites">' +
            '   <span>' + data.fecha + '  ' + data.descripcion + '</span>' +
            '</div>';
}

function addElementProcesos(data) {

    var momentos = '';

    $(data.proceso).each(function (i) {
        momentos += addElementMomento(this);
    });

    return '' +
            '<div class="content-title-linea-tiempo">' +
            '   <div>' +
            '       <span>Radicado numero ' + data.numero + ', realizado el dia ' + data.fecha + '</span>' +
            '   </div>' +
            '</div>' +
            '<div class="linea-tiempo">' + momentos + '</div>';
}

function addElementMomento(data) {

    return '' +
            '   <div class="momento">' +
            '       <h4>' + data.fecha + '</h4>' +
            '       <div class="descripcion">' + data.descripcion + '</div>' +
            '   </div>';
}

function addElementMultimedia(data) {

    return '' +
            '<a href="' + data.ruta + '" download="' + data.nombre + '" class="content-item-file">' +
            '   <button class="button-download">' +
            '       <label>' + data.nombre + '</label>' +
            '   </button>' +
            '</a>';
}