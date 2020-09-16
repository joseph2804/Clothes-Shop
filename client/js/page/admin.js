'use strict';

$(document).ready(function () {

    $('body').on('click', 'button.edit', function () {
        var level = $(this).closest('.form-row').find('input.level').val();
        $(this).closest('.form-row').find('.edit-level input').val(level);
        $(this).closest('.form-row').find('.edit-level').removeClass('d-none');
        $(this).closest('.form-row').find('.edit-level').addClass('d-block');
    });
});