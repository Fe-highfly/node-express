var express = require('express'),
    async = require('async'),
    utility = require('../utility/utility'),
    config = require('../../config'),
    request = require('request'),
    log4js = require('log4js'),
    logger = require("../utility/logHelper").helper;


function getData(cookies, req, callback, url) {
    request(utility.responseHeaders({
        url: url,
        token: cookies
    }, req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(error, body != "" ? JSON.parse(body) : body);
        } else {
            logger.writeErr("接口错误：" + error + "response.statusCode")
        }
    })
}

module.exports = getData;