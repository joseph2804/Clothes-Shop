'use strict';

export function changeProductColor() {
    $('body').on('click', '.color', function () {
        if (!$(this).hasClass('selected')) {
            let newUrl = $(this).data('image');
            let newColor = $(this).data('color');

            $(this).closest('.product-color').find('.color').removeClass('selected');
            $(this).addClass('selected');

            let imageEl = $(this).closest('.product-info').find('.image');
            //update color to add to cart button
            let addToCartBtn = $(this).closest('.product-content-info').find('button.add-to-cart');

            addToCartBtn.data('product-color', newColor);
            imageEl.attr('src', newUrl);
        }
    });
};