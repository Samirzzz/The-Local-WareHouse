$(document).ready(function () {
    $("#errormail").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#errormail').val();
        $.ajax({
            url: '/user/checkem',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Email: data }),
            success: function (response) {
                $('#erroruser').html('Email is ' + response);

                if (response == 'taken') {
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