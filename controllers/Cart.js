'use strict';

var express = require('express');
var server = express.Router();
var productHelper = require('../scripts/ProductHelper');
var cartHelper = require('../scripts/CartHelper');

server.post('/', function (req, res) {
    if (!req.session.User) {
        req.session.redirectTo = req.body.backUrl;

        return res.json({
            error: true,
            message: 'Chưa đăng nhập',
            needLogin: true
        });
    } else {
        var productId = req.body.productId;
        var productColor = req.body.productColor;

        productHelper.getProductByIdAndColor(productId, productColor, function (err, product) {
            if (err) {
                return res.json({
                    error: true,
                    message: err.message
                });
            } else {
                var email = req.session.User.email;

                cartHelper.newCart(productId, productColor, 1, product[0].ProductPrice, product[0].ProductName, email, function (err, result) {
                    if (err) {
                        return res.json({
                            error: true,
                            message: err.message
                        });
                    } else {
                        return res.json({
                            error: false,
                            message: 'Thêm vào giỏ hàng thành công'
                        })
                    }
                });
            }
        });
    }
});

server.get('/getCount', function (req, res) {
    if (!req.session.User) {
        return res.json({
            count: 0
        });
    } else {
        var email = req.session.User.email;
        cartHelper.getCountByEmail(email, function (err, result) {
            if (!err) {
                var count = 0;
    
                result.forEach(function (i) {
                    count += i.Quantity;
                });
    
                return res.json({
                    count: count
                })
            }
        });
    }
});

server.get('/show', function (req, res) {
    if (!req.session.User) {
        req.session.redirectTo = req.originalUrl;

        res.redirect('/login');
    } else {
        cartHelper.getAllCartItems(req.session.User.email, function (listItems) {
            res.render('cart', {
                listItems: listItems
            });
        });
    }
});

server.post('/remove', function (req, res) {
    var productId = req.body.productId;

    if (!req.session.User) {
        return res.json({
            error: true,
            noLogin: true
        });
    } else {
        cartHelper.removeProductById(productId, function (err, result) {
            if (!err) {
                return res.json({
                    error: false
                });
            } else {
                return res.json({
                    error: true
                });
            }
        });
    }
});

server.post('/change', function(req, res) {
    var productId = req.body.productId;
    var valueChange = req.body.valueChange;

    if (!req.session.User) {
        return res.json({
            error: true,
            noLogin: true
        });
    } else {
        cartHelper.changeProductById(req.session.User.email, productId, valueChange, function (err, result) {
            if (!err) {
                return res.json({
                    error: false
                });
            } else {
                return res.json({
                    error: true
                });
            }
        });
    }
});

module.exports = server;
