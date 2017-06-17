var index = require('../controller/list');
var index = require('../controller/index');
var express = require('express');

module.exports = function(app) {
    app.use('/', router);
}