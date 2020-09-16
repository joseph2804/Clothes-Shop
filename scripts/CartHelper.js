'use strict';

var connectHelper = require('../scripts/ConnectHelper');

function newCart(productId, color, quantity, price, name, email, callback) {
    connectHelper.queryString(`SELECT Quantity FROM cart WHERE email = '${email}' AND ProductID = '${productId}_${color}'`, function (err, result) {
        if (!err) {
            var currentQuantity = result.length > 0 ? result[0].Quantity : 0;
            var queryString = '';
            var total = 0;

            if (currentQuantity > 0) {
                currentQuantity++;
                total = currentQuantity * price;

                queryString = `UPDATE cart SET Quantity=${currentQuantity}, Totals=${total} WHERE email = '${email}' AND ProductID = '${productId}_${color}'`;
            } else {
                total = quantity * price;

                queryString = `INSERT INTO cart(ID, email, ProductID, ProductName, Quantity, Totals) VALUES ('', '${email}', '${productId}_${color}', '${name}', ${quantity}, ${total})`;
            }

            connectHelper.queryString(queryString, callback);
        }
    })
}

function getCountByEmail(email, callback) {
    var queryString = `SELECT Quantity FROM cart WHERE email = '${email}'`;

    connectHelper.queryString(queryString, callback);
};

function getAllCartItems(email, callback) {
    var queryString = `SELECT ProductID, Quantity, ProductName, Totals FROM cart WHERE email = '${email}'`;

    connectHelper.queryString(queryString, function (err, result) {
        if (!err) {
            var listItems = [];
            result.forEach(function (cartItem) {
                listItems.push({
                    productId: cartItem.ProductID,
                    name: cartItem.ProductName,
                    quantity: cartItem.Quantity,
                    price: cartItem.Totals / cartItem.Quantity,
                    totals: cartItem.Totals
                });
            });
            callback(listItems);
        }
    });
}

function removeProductById(productId, callback) {
    var queryString = `DELETE FROM cart WHERE ProductID = '${productId}'`;

    connectHelper.queryString(queryString, function (err, result) {
        callback(err, result);
    });
}

function changeProductById(email, productId, valueChange, callback) {
    connectHelper.queryString(`SELECT * FROM cart WHERE email = '${email}' AND ProductID = '${productId}'`, function (err, result) {
        if (!err) {
            var currentQuantity = result[0].Quantity;
            var queryString = '';
            var total = 0;
            var price = result[0].Totals / result[0].Quantity;

            currentQuantity += parseInt(valueChange);
            total = currentQuantity * price;

            queryString = `UPDATE cart SET Quantity=${currentQuantity}, Totals=${total} WHERE email = '${email}' AND ProductID = '${productId}'`;

            connectHelper.queryString(queryString, callback);
        }
    })
}

module.exports = {
    newCart: newCart,
    getCountByEmail: getCountByEmail,
    getAllCartItems: getAllCartItems,
    removeProductById: removeProductById,
    changeProductById: changeProductById
}
