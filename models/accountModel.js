'use strict'

function account(account) {
    this.id = account.ID;
    this.name = account.name;
    this.email = account.email;
    this.isAdmin = false;
}

module.exports = account;
