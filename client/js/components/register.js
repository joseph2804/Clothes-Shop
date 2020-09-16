'use strict';

export function registration() {
    var password = $('.password');
    var rePassword = $('.re-password');

    validationForm();

    $('#registerForm').submit(function (e) {

        e.preventDefault();
        if (rePassword.val() === password.val()) {
            $.ajax({
                url: "/login/registration",
                type: "POST",
                data: $(this).serialize(),
                success: function (response) {
                    if (response.error) {
                        $('.email').val('');
                        $('.answer').text(response.message);
                    } else {
                        $('.answer').text(response.message);
                        window.location.href = response.redirect;
                    }
                }
            });
        } else {
            rePassword.val('');
        }
    });
};

export function validationForm() {
    $('.re-password').keyup(function () {
        if ($('.password').val() === $(this).val()) {
            $('.success').addClass('d-block');
            $('.success').addClass('text-success');
            $('.warning').removeClass('d-block');
        } else {
            $('.warning').addClass('d-block');
            $('.success').removeClass('d-block');
        }
    });
};