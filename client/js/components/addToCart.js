'use strict';

export function getLink() {
    $('body').on('click', 'button.add-to-cart', function () {
        let productId = $(this).data('product-id');
        let productColor = $(this).data('product-color');

        $.ajax({
            url: '/cart',
            type: 'POST',
            data: {
                productId: productId,
                productColor: productColor,
                backUrl: window.location.href.split(/^(http:\/\/.*)(\/.*\/.*)/g).filter(s => s)[1]
            },
            success: function (data) {
                if (data.needLogin) {
                    window.location.href = '/login';
                } else {
                    $('body').trigger('showCart');
                }
            },
            error: function (e) {
                console.log(e);
            }
        })
    });
}
