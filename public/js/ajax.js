$(document).ready(function () {
    $("#Email").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#Email').val();
        $.ajax({
            url: '/user/logs',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Email: data }),
            success: function (response) {
                $('#backend').html('Email is ' + response);

                if (response == 'taken') {
                    $('#backend').css("color", "red");
                }
                else {
                    $('#backend').css("color", "green");
                }
            }
        });
    });
});