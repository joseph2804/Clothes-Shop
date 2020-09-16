$(document).ready(function() {
    $('body').on('showCart', function() {
        $.ajax({
            url: '/cart/getCount',
            type: 'get',
            success: function(data) {
                $('.cart a').attr('data-cart', data.count);

                if (data.count > 0) {
                    $('.cart').addClass('add');

                    setTimeout(function() {
                        $('.cart').removeClass('add');
                    }, 300);
                }
            }
        });
    })

    $('body').trigger('showCart');
});