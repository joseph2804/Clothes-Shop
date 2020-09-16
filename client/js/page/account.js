'use strict';

$(document).ready(function () {
    $('body').on('submit.changeName', '.account-page form', function(e) {
        e.preventDefault();

        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: $(this).serialize(),
            success: function (data) {
                if (data.error) {
                    $('#name').val($('.logout b').text());
                } else {
                    $('.logout b').text($('#name').val());
                }

                alert(data.message);
                $('.btn-submit').attr('disabled', true);
                $('#name').data('old-name', $('#name').val());
            },
            error: function (e) {
                console.log(e);
            }
        })
    })

    $('body').on('keyup', '#name', function() {
        if ($(this).val() !== $(this).data('old-name')) {
            $('.btn-submit').attr('disabled', false);
        } else {
            $('.btn-submit').attr('disabled', true);
        }
    });
});