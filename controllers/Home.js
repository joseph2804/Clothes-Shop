'use strict';

var express = require('express');
var server = express.Router();
var productHelper = require('../scripts/ProductHelper');

server.get('/', function(req, res, next) {
    productHelper.getHotDeals(function (err, hotDeal) {
        if (err) {
            return res.json({
                error: true,
                message: err.message
            })
        } else {
            productHelper.getNewArrivals(function (err, newArrivals) {
                if (err) {
                    return res.json({
                        error: true,
                        message: err.message
                    })
                } else {
                    res.render('home', {
                        hotDealList: hotDeal,
                        newArrivalsList: newArrivals
                    });
                }
            });
        }
    });
});

module.exports = server;
