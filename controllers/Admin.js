'use strict';

var express = require('express');
var server = express.Router();
var LoginHelper = require('../scripts/LoginHelper');
var AdminHelper = require('../scripts/AdminHelper');

server.get('/', function (req, res) {
    var currentUser = LoginHelper.getCurrentCustomer(req);

    if (currentUser) {
        LoginHelper.checkAdminRole(currentUser, function (err, result) {
            if (!err && result.length > 0 && !!result[0].Level) {
                AdminHelper.getUsers(function (err, result) {
                    if (err)
                        return res.json({
                            error: true,
                            message: err.message
                        });
                    AdminHelper.getRole(function (err, role) {
                        if (err)
                            return res.json({
                                error: true,
                                message: err.message
                            });
                        AdminHelper.getLogger(function (err, logger) {
                            if (err)
                                return res.json({
                                    error: true,
                                    message: err.message
                                });
                            return res.render('admin', {
                                result: result,
                                role: role,
                                logger: logger
                            });
                        });
                    })
                });
            }
            // return res.redirect('/account');
        });
    } else {
        req.session.redirectTo = req.originalUrl;

        return res.redirect('/login');
    }
});

server.get('/register', function (req, res) {
    res.render('register', {
        admin: true
    });
});

module.exports = server;