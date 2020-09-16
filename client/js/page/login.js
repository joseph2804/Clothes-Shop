$(document).ready(function () {
    $('body').on('submit.login', 'form', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/login/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                if (data.error) {
                    $('.message').text(data.message);
                    $('.message').addClass('has-error');
                } else {
                    $('.message').text('No error');
                    $('.message').removeClass('has-error');

                    window.location.href = data.redirect;
                }
            }
        });
    })
})
