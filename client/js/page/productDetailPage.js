'use strict';

import {changeProductColor} from '../components/changeColor.js';
import {getLink} from '../components/addToCart.js';

$(document).ready(function() {
    changeProductColor();
    changeUrl();
    getLink();
    changeColorAddToCart();
    $('.color.selected').trigger('click.changeColor');
})

function changeUrl() {
    $('body').on('click.changeUrl', '.color', function () {
        if ($(this).hasClass('selected')) {
            let newUrl = $(this).data('url');

            window.history.pushState("object or string", "Title", newUrl);
        }
    });
}

function changeColorAddToCart() {
    $('body').on('click.changeColor', '.color', function () {
        if ($(this).hasClass('selected')) {
            $('button.add-to-cart').data('product-color', $(this).data('color'));
        }
    });
}
