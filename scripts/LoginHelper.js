'use strict';

var connectHelper = require('../scripts/ConnectHelper');

function getCurrentCustomer(req) {
    if (req.session.User) {
        return req.session.User.email;
    }

    return null;
};

function checkInput(email, password, callback) {
    var queryString = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;

    connectHelper.queryString(queryString, callback);
};

function checkAdminRole(email, callback) {
    var queryString = `SELECT Level FROM role WHERE email = '${email}'`;

    connectHelper.queryString(queryString, callback);
}

function changeName(email, name, callback) {
    var queryString = `UPDATE user SET name='${name}' WHERE email = '${email}'`;

    connectHelper.queryString(queryString, callback);
}

module.exports = {
    getCurrentCustomer: getCurrentCustomer,
    checkInput: checkInput,
    checkAdminRole: checkAdminRole,
    changeName: changeName
}
