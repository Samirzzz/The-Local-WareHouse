$(document).ready(function () {
    $("#signupform").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#email').val();
        $.ajax({
            url: '/user/AddUser',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ Email: data }),
            success: function (response) {
                $('#backend').html('Email is ' + response);

                if (response == 'Does not exist') {
                    $('#backend').css("color", "red");
                }
                else if(response=='') {
                    $('#backend').css("color", "green");
                }
            },
            
        });
    });
});