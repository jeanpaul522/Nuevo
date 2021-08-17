
var dataUsuario = null;

$(document).ready(function () {

    initModule();
});

function initModule() {

    $('#Content_General').css('display', 'block');
}

function showMessage(state, message) {

    var title = (state === 1 ? "!Bien, se completó corectamente¡" : "!Oopss, ocurrió un error¡");
    var messageLocal = (message === null ? "Lo sentimos, ocurrió un error, intenta más tarde o comunícate con el administrador del sistema" : message);

    $('#Text_Message_Title').text(title);
    $('#Text_Message_Body').text(messageLocal);

    $('#Content_General').hide();

    $('.content-message').show();
}

function hideMessage() {

    $('#Content_General').show();

    $('.content-message').hide();
}