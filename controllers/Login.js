'use strict';

var express = require('express');
var server = express.Router();
var LoginHelper = require('../scripts/LoginHelper');
var RegisterHelper = require('../scripts/RegisterHelper');
var AccountModel = require('../models/accountModel');

server.get('/', function (req, res) {
    var redirectTo = req.session.redirectTo || '/account';

    if (LoginHelper.getCurrentCustomer(req))
        return res.redirect(redirectTo);

    res.render('login');
});

server.post('/login', function (req, res) {
    var redirectTo = req.session.redirectTo || '/account';

    if (LoginHelper.getCurrentCustomer(req))
        return res.redirect(redirectTo);

    var reqData = req.body;
    var email = reqData.email;
    var password = reqData.password;

    if (!email || !password)
        return res.json({
            error: true,
            message: 'Chưa nhập tài khoản & mật khẩu'
        });

    LoginHelper.checkInput(email, password, function (err, result) {
        if (err)
            return res.json({
                error: true,
                message: err.message
            });

        if (result.length === 0)
            return res.json({
                error: true,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });

        var account = new AccountModel(result[0]);

        req.session.User = {
            email: email,
            id: account.id,
            name: account.name,
            isAdmin: account.isAdmin
        };

        LoginHelper.checkAdminRole(account.email, function (err, result) {
            if (!err && result.length > 0) req.session.User.isAdmin = !!result[0].Level;

            return res.json({
                error: false,
                redirect: redirectTo
            });
        });
    });
});

server.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) return res.send(err);
    });

    res.redirect('/login');
});

server.get('/register', function (req, res) {
    res.render('register', {
        admin: false
    });
})

server.post('/registration', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var redirectTo = '/account';
    var level = req.body.level !== '1' ? '0' : '1';

    RegisterHelper.checkExistAccount(email, function (err, result) {
        if (err) return res.json({
            error: true,
            message: err.message
        });

        else if (result.length > 0) return res.json({
            error: true,
            message: 'Email đã tồn tại'
        });

        else {
            RegisterHelper.addNewAccount(email, password, name, function (err, result) {
                if (err) return res.json({
                    error: true,
                    message: err.message
                });

                else {
                    req.session.User = {
                        email: email,
                        name: name,
                        isAdmin: false
                    }

                    RegisterHelper.addRole(email, level, function (err, result) {
                        if (err) return res.json({
                            error: true,
                            message: err.message
                        });

                        else {
                            if (level === '1') {
                                redirectTo = '/admin';
                                req.session.User.isAdmin = true;
                            }

                            RegisterHelper.addLogger(email, name, function (err, result) {
                                if (err) return res.json({
                                    error: true,
                                    message: err.message
                                });

                                else return res.json({
                                    error: false,
                                    message: 'Tạo thành công',
                                    redirect: redirectTo
                                });
                            });
                        }
                    });
                }
            });
        }
    });
});

module.exports = server;