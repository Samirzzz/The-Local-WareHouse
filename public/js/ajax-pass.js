$(document).ready(function () {
    $("#password").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#password').val();
        $.ajax({
            url: '/user/checkpass',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ password: data }),
            success: function (response) {
                $('#errorpass').html('password is ' + response);

                if (response == 'incorrect') {
                    $('#errorpass').css("color", "red");
                }
                else if(response =='available') {
                    $('#errorpass').css("color", "green");
                }
            },
            error:function(err){

            }
        });
    });
});