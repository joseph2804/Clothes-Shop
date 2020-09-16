'use strict';

import {changeProductColor} from '../components/changeColor.js';
import {getLink} from '../components/addToCart.js';

$(document).ready(function() {
    changeProductColor();
    getLink();
    updateBtnDetail();

    //handle select all filter
    $('body').on('change', '#all', function() {
        $('.filter-checkbox').prop('checked', $(this).prop('checked'));
        $('.filter-checkbox').trigger('change');
    });

    //handle select filter
    $('body').on('change', '.filter-checkbox', function() {
        let filterArray = [];

        $('#all').prop('checked', true);
        $('.filter-checkbox').each(function() {
            if($(this).prop('checked')) filterArray.push($(this).attr('id'));
            else $('#all').prop('checked', false);
        });

        // loading();
        filterBy(filterArray.join(','));
    });

    //handle change sorting rule
    $('body').on('change', '.sort-radio', function() {
        // loading();
        sortBy($(this).attr('id'));
    });

    //handle first load
    let sortString = getParams('sort');
    let filterString = getParams('type');

    let typeArray = filterString ? filterString.split(',') : ['all'];
    typeArray.forEach(function(element) {
        $(`#${element}`).prop('checked', true);
        $(`#${element}`).trigger('change');
    });

    $(`#${sortString}`).prop('checked', true);
    $(`#${sortString}`).trigger('change');
});

function filterBy(filterList) {
    if (!filterList) {
        $('.product-list .product').addClass('d-none');
        return
    }

    let typeArray = filterList.split(',');

    $('.product-list .product').addClass('d-none');
    $('.product-list .product').each(function () {
        let type = $(this).data('type');

        if (typeArray.find(element => element === type)) $(this).removeClass('d-none');
    });
    updateUrl();
}

function sortBy(rule) {
    if (!rule &&
        rule !== 'price-up' &&
        rule !== 'price-down' &&
        rule !== 'id' &&
        rule !== 'sold') return

    $('.product-list .product').each(function () {
        let order = '';

        if (rule === 'price-up') order = $(this).data('price');
        if (rule === 'price-down') order = `-${$(this).data('price')}`;
        if (rule === 'id') order = `-${$(this).data('id')}`;
        if (rule === 'sold') order = $(this).data('sold');

        $(this).css({
            order: order
        });
    });
    updateUrl();
}

function getParams(name){
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

// function loading() {
//     $('.loading').removeClass('none');
//     setTimeout(() => $('.loading').addClass('none'), 500);
// }

function updateUrl() {
    let sortString = $('.sort-radio:checked').attr('id') || 'id';
    let filter = [];

    $('.filter-checkbox:checked').each(function () {
        filter.push($(this).attr('id'));
    });

    let newData = `product?type=${filter.join(',')}&sort=${sortString}`;
    
    window.history.pushState("object or string", "Title", newData);
}

function updateBtnDetail() {
    $('body').on('click.changeUrlBtnDetail', '.color', function () {
        if ($(this).hasClass('selected')) {
            let newUrlDetail = $(this).data('set-url');
            let btnGetColor = $(this).closest('.product-info').find('.get-color');

            btnGetColor.attr('href', newUrlDetail);
        }
    });
}
