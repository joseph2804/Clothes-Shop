'use strict';

var connectHelper = require('../scripts/ConnectHelper');

function checkExistAccount(email, callback) {
    var queryString = `SELECT * FROM user WHERE email = '${email}'`;

    connectHelper.queryString(queryString, callback);
}

function addNewAccount(email, password, name, callback) {
    var queryString = `INSERT INTO user(ID, email, password, name) VALUES ('', '${email}', '${password}', '${name}')`;
    
    connectHelper.queryString(queryString, callback);
}

function addRole(email, level, callback) {
    var queryString = `INSERT INTO role(ID, email, Level) VALUES ('', '${email}', '${level}')`;
    
    connectHelper.queryString(queryString, callback);
}

function addLogger(email, records, callback) {
    var queryString = `INSERT INTO logger(ID, email, Records, Time) VALUES ('', '${email}', '${records}', now())`;

    connectHelper.queryString(queryString, callback);
}

module.exports = {
    checkExistAccount: checkExistAccount,
    addNewAccount: addNewAccount,
    addRole: addRole,
    addLogger: addLogger
}