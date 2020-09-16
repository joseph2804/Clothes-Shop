'use strict';

var connectHelper = require('../scripts/ConnectHelper');

function getUsers(callback) {
    connectHelper.queryString('SELECT * FROM user', function (err, result) {
        callback(err, result);
    });
}
function getRole(callback) {
    connectHelper.queryString('SELECT Level FROM role', function (err, result) {
        callback(err, result);
    });
}
function getLogger(callback) {
    connectHelper.queryString('SELECT * FROM logger', function (err, result) {
        callback(err, result);
    });
}

module.exports = {
    getUsers: getUsers,
    getRole: getRole,
    getLogger: getLogger
}