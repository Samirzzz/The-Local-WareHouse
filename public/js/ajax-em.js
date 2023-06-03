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
                $('#errormails').html('Email is ' + response);

                if (response == 'taken') {
                    $('#errormails').css("color", "red");
                }
                else if(response =='available') {
                    $('#errormails').css("color", "green");
                }
            },
            error:function(err){

            }
        });
    });
});