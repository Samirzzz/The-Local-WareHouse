$(document).ready(function () {
    $("#email").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#email').val();
        $.ajax({
            url: '/user/checkemlogin',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Email: data }),
            success: function (response) {
                $('#erroruser').html('Email is ' + response);

                if (response == 'not found') {
                    $('#erroruser').css("color", "red");
                }
                else if(response =='available') {
                    $('#erroruser').css("color", "green");
                }
            },
            error:function(err){

            }
        });
    });
});