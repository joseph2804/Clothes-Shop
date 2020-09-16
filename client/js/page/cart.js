$(document).ready(function () {
    removeProduct();
    convertTotals($('.cart-totals'));
    changeQuantity();
});

function removeProduct() {
    $('body').on('click.removeProduct', 'div.close', function () {
        let productId = $(this).closest('.product-info').data('product-id');

        $('#removeMessageModal').data('product-id', productId);
        $('#removeMessageModal').data('product', $(this).closest('.product-info'));
    });

    $('body').on('click.removeProduct', '#removeMessageModal button.btn-primary', function () {
        let productId = $(this).closest('#removeMessageModal').data('product-id');
        let productEl = $(this).closest('#removeMessageModal').data('product');

        $.ajax({
            url: '/cart/remove',
            type: 'POST',
            data: {
                productId: productId
            },
            success: function (data) {
                if (!data.error) {
                    //remove from frontend
                    $('#removeMessageModal').modal('hide');
                    productEl.remove();

                    updateTotals();
                    handleChangeCartTotals();
                    $('body').trigger('showCart');
                } else if (data.noLogin) {
                    window.location.href = '/login';
                } else {
                    $('#removeMessageModal').modal('hide');
                    alert('có lỗi hệ thống xảy ra, vui lòng thử lại');
                }
            }
        });
    })
}

function updateTotals() {
    if ($('.product-info').length === 0) {
        $('.cart-shown').addClass('d-none');
        $('.empty-cart').removeClass('d-none');
    } else {
        let cartTotals = 0;
        $('.product-info').each(function () {
            let totals = $(this).find('.product-totals');
            cartTotals += totals.data('total');
        });
    }
}

function handleChangeCartTotals() {
    let cartTotals = 0;
    $('.product-totals').each(function () {
        cartTotals += parseInt($(this).data('total'));
    })

    $('.cart-totals').data('cart-totals', cartTotals);
    convertTotals($('.cart-totals'));
}

function changeQuantity() {
    $('body').on('click.changeQuantity', '.btn-change', function (e) {
        e.preventDefault();

        let valueChange = 1;
        if ($(this).hasClass('minus')) valueChange = -1;

        let parent = $(this).closest('.quantity');
        let quantity = parent.find('input');
        let productTotals = parent.find('.product-totals');

        if (parseInt(quantity.val()) + valueChange === 0) {
            $(this).closest('.product-info').find('.close').trigger('click');
            $(this).closest('.product-info').find('.close').find('a').trigger('click');
        } else {
            $.ajax({
                url: '/cart/change',
                type: 'POST',
                data: {
                    productId: $(this).closest('.product-info').data('productId'),
                    valueChange: valueChange
                },
                success: function (data) {
                    if (!data.error) {
                        quantity.val(parseInt(quantity.val()) + valueChange);
                        productTotals.data('total', parseInt(quantity.val()) * parseInt(parent.data('price')));
                        convertTotals(productTotals);
                        handleChangeCartTotals();

                        $('body').trigger('showCart');
                    } else if (data.noLogin) {
                        window.location.href = '/login';
                    } else {
                        alert('có lỗi hệ thống xảy ra, vui lòng thử lại');
                    }
                }
            });
        }
    })
}

function convertTotals(cartTotals) {
    let number = cartTotals.data('cart-totals') || cartTotals.data('total');
    if (!number) return 0;

    let string = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.").concat(' vnđ');

    cartTotals.text('Tổng: ' + string);
    return 1;
}