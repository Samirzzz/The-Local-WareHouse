$(document).ready(function () {
    $("#signup-form").on('keyup', function (e) {
        e.preventDefault();
        var un = $('#errorName').val();
        var em = $('#erroremail').val();
        var pass = $('#errorpassid').val();
        //var conf = $('#errorconpassword').val();
        var ph = $('#errorno').val();
        var ad = $('#adress').val();
        var gn = $('#gender').val();


        $.ajax({
            url: '/user/AddUser',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 
                username: un,
                Email:em,
                password : pass,
                phonee:ph,
                address:ad,
                gender:gn
            
            }),
            success: function (response) {
                $('#un-error').html( response);
                $('#em-error').html( response);
                $('#pass-error').html( response);
                $('#ph-error').html( response);
                $('#add-error').html( response);
                $('#gn-error').html( response);


                if (response == 'Username is required') {
                    $('#us-error').css("color", "red");
                }else if(response == 'Email is required'){
                    $('#em-error').css("color", "red");
                }
                else if(response == 'Password is required'){
                    $('#pass-error').css("color", "red");
                }
                else if(response == 'phone number required'){
                    $('#ph-error').css("color", "red");
                }
                else if(response == 'adress required'){
                    $('#add-error').css("color", "red");
                }else if(response == 'gender required'){
                    $('#gn-error').css("color", "red");
                }
                else {
                    $('#us-error').css("color", "green");
                }
            },
            error:function(err){

            }
        });
    });
});