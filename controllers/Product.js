'use strict';

var express = require('express');
var server = express.Router();
var productHelper = require('../scripts/ProductHelper');

server.get('/', function (req, res) {
    productHelper.getProducts(function (err, result) {
        if (err) {
            return res.json({
                error: true,
                message: err.message
            });
        } else {
            res.render('product', {
                result: result
            });
        }
    })
})

server.get('/detail', function (req, res) {
    var productId = req.query.productId;
    var productColor = req.query.color;

    productHelper.getProductByIdAndColor(productId, productColor, function (err, result) {
        if (err) {
            return res.json({
                err: true,
                message: err.message
            });
        } else if (result.length === 0) {
            return res.json({
                err: true,
                message: 'Không tìm thấy sản phẩm yêu cầu.'
            });
        } else {
            return res.render('detail', {
                result: result,
                productColor: productColor
            });
        }
    });
})

module.exports = server;
