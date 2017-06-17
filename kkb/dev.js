'use strict';
var nock = require("nock"),
    config = require('config');
//log = require('./app/factory/log');

module.exports = (app) => {
    let baseApiUrl = config.api;

    app.use((req, res, next) => {

        next();
    })

}