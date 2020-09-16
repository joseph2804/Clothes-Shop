'use strict';

var express = require('express');
var server = express.Router();
var LoginHelper = require('../scripts/LoginHelper');

server.get('/', function (req, res) {
    if (LoginHelper.getCurrentCustomer(req))
        return res.render('account', {
            email: req.session.User.email,
            id: req.session.User.id,
            name: req.session.User.name,
            isAdmin: req.session.User.isAdmin
        });

    req.session.redirectTo = req.originalUrl;

    res.redirect('/login');
});

server.post('/changeName', function(req, res) {
    var name = req.body.name;
    
    if (!req.session.User) {
        return res.json({
            error: true,
            noLogin: true
        });
    } else {
        LoginHelper.changeName(req.session.User.email, name, function (err, result) {
            if (!err) {
                req.session.User.name = name;

                return res.json({
                    error: false,
                    message: 'Thay đổi tên thành công'
                });
            } else {
                return res.json({
                    error: true,
                    message: 'Có lỗi xảy ra, vui lòng thử lại sau'
                });
            }
        });
    }
})

module.exports = server;
