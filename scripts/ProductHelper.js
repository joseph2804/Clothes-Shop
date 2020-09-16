'use strict';

var connectHelper = require('../scripts/ConnectHelper');

function getNewArrivals(callback) {
    connectHelper.queryString('SELECT * FROM product ORDER BY ID DESC LIMIT 4;', function (err, result) {
        callback(err, result);
    });
};

function getHotDeals(callback) {
    connectHelper.queryString('SELECT * FROM product ORDER BY Sold DESC LIMIT 4;', function (err, result) {
        callback(err, result);
    });
}

function getProducts(callback) {
    connectHelper.queryString('SELECT * FROM product ORDER BY ID DESC', function (err, result) {
        callback(err, result);
    });
}

function getProductByIdAndColor(productId, productColor, callback) {
    connectHelper.queryString('SELECT * FROM product WHERE ProductID =' + '\'' + productId + '\' AND ProductImage LIKE \'\%' + productColor + '\%\'', function (err, result) {
        callback(err, result);
    });
}

module.exports = {
    getNewArrivals: getNewArrivals,
    getHotDeals: getHotDeals,
    getProducts: getProducts,
    getProductByIdAndColor: getProductByIdAndColor
}
