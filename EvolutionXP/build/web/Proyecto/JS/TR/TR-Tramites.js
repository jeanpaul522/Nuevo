
var dataUsers = [], tramites = [];

$(document).ready(function () {

    initView();

    $('#Button_Consultar').on('click', function () {

        if (validateSearchTramites()) {
            searchTramites();
        }
    });

    $('#Button_Message_Aceptar').on('click', function () {

        hideMessage();
    });
    
    $('#Button_Cerrar_Procesos').on('click', function () {
        
        resetProcesos();
        resetMultimedia();
    });

    $('#Text_Buscar_Tramite').on('keyup', function () {

        keyUpBuscarTramites();
    });

    $('#Content_Tramites_List').on('click', '.content-item-tramites', function () {

        var key = $(this).attr('key');

        searchProcesos(key);
    });

});

function initView() {

    $.getJSON("../../Assets/Data/Tramites.json", function (dataOuput) {
        dataUsers = dataOuput;
    });
}

function validateSearchTramites() {

    if ($('#Text_Correo').val() === "" && $('#Text_Telefono').val() === "") {

        showMessage(0, "Debes digitar el correo o telefono para consultar los tramites");
        return false;
    }

    if ($('#Text_PIN').val() === "") {

        showMessage(0, "Debes digitar el código para poder consultar los tramites");
        return false;
    }

    return true;
}

function searchTramites() {

    var correo = $('#Text_Correo').val();
    var telefono = $('#Text_Telefono').val();
    var codigo = $('#Text_PIN').val();

    resetTramites();
    resetProcesos();
    resetMultimedia();

    var dataUser = $(dataUsers).filter(function (index, data) {
        return (data.correo === correo || data.telefono === telefono) && data.PIN === codigo;
    });

    operationSearchTramites(dataUser);
}

function operationSearchTramites(inputData) {

    if (inputData.length > 0) {

        tramites = inputData[0].tramites;

        $(tramites).each(function (i) {

            $('#Content_Tramites_List').append(addElementTramites(this));
        });

        $('.content-item-tramites').eq(0).addClass('option-selected');

        $('#Content_Tramites_List').removeClass('hide-element');
        $('#Empty_Tramites').addClass('hide-element');

    } else {

        showMessage(0, "Lo sentimos, no encotramos datos con al información ingresada");
    }
}

function keyUpBuscarTramites() {

    var buscarTramite = $('#Text_Buscar_Tramite').val();

    resetTramites();

    var dataTramites = $(tramites).filter(function (index, data) {
        return data.descripcion.toLowerCase().includes(buscarTramite.toLowerCase());
    });

    operationKeyUpBuscarTramites(dataTramites);

}

function operationKeyUpBuscarTramites(inputData) {

    if (inputData.length > 0) {

        $(inputData).each(function (i) {

            $('#Content_Tramites_List').append(addElementTramites(this));
        });

        $('.content-item-tramites').eq(0).addClass('option-selected');

        $('#Content_Tramites_List').removeClass('hide-element');
        $('#Empty_Tramites').addClass('hide-element');

    } else {

        $('#Content_Tramites_List').addClass('hide-element');
        $('#Empty_Tramites').removeClass('hide-element');
    }
}

function searchProcesos(key) {

    $('.content-item-tramites').removeClass('option-selected');
    $('.content-item-tramites[key=' + key + ']').addClass('option-selected');
    
    resetMultimedia();
    resetProcesos();

    var dataProcesos = $(tramites).filter(function (index, data) {
        return data.key === parseInt(key);
    });

    operationSearchProcesos(dataProcesos);
    operationSearchMultimedia(dataProcesos);
}

function operationSearchProcesos(inputData) {
    
    if (inputData.length > 0) {

        var tramite = inputData[0];

        if (tramite.procesos !== undefined) {

            var procesos = tramite.procesos;

            $(procesos).each(function (i) {

                $('#Content_Procesos').append(addElementProcesos(this));
            });

            $('#Content_Procesos').removeClass('hide-element');
            $('#Empty_Procesos').addClass('hide-element');
        } else {

            showMessage(0, "Lo sentimos, no encotramos datos de procesos, verifique los datos");
        }

    } else {

        showMessage(0, "Lo sentimos, no encotramos datos del tramite, verifique los datos");
    }
}

function operationSearchMultimedia(inputData) {
    
    if (inputData.length > 0) {
        
        var tramite = inputData[0];

        if (tramite.documentos !== undefined) {

            var documentos = tramite.documentos;

            $(documentos).each(function (i) {

                $('#Content_Multimedia').append(addElementMultimedia(this));
            });

            $('#Content_Multimedia').removeClass('hide-element');
        }
    }
    
} 

function resetTramites() {

    $('#Content_Tramites_List').addClass('hide-element');
    $('#Empty_Tramites').removeClass('hide-element');

    $('.content-item-tramites').remove();
}

function resetMultimedia() {

    $('#Content_Multimedia').addClass('hide-element');

    $('.content-item-file').remove();
}

function resetProcesos() {

    $('#Content_Procesos').addClass('hide-element');
    $('#Empty_Procesos').removeClass('hide-element');

    $('.linea-tiempo').remove();
    $('.content-title-linea-tiempo').remove();
}