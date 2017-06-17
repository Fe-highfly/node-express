var express = require('express'),
    async = require('async'),
    utility = require('../utility/utility'),
    log4js = require('log4js'),
    logger = require("../utility/logHelper").helper,
    router = express.Router(),
    config = require('../../config'),
    redis_client = require('redis').createClient(config.redis.port, config.redis.host, config.redis.opt)



function Router(obj) {
    this.urlPath = obj.urlPath || "/";
    this.api = obj.api || {}; //api执行请求的函数
    this.errorPage = obj.errorPage || "index";
    this.renderPage = obj.renderPage;
    // this.cookies = utility.JSONCookies(arguments[0][0].headers.cookie);
    this.redis_key = obj.redis_key;
    this.cache = obj.cache || false;

}

Router.prototype.getRouter = function(req, res, next) {
    var that = this;
    var t1 = new Date().getTime();
    var t2;
    //var cookies = utility.JSONCookies(req.headers.cookie)
    var cookies = "cookies";
    async.parallel(that.api,
        function(err, results) {
            if (err) {
                logger.writeErr('接口：' + err);
                res.render(that.errorPage)
            } else {
                console.log(results)
                t2 = new Date().getTime();
                console.log("接口的时间差" + (t2 - t1))
                logger.writeInfo("接口的时间差" + (t2 - t1));
                res.render(that.renderPage, {
                    data: results
                })
            }
        });

};
Router.prototype.api = function(callback) {
    request(utility.responseHeaders({
        url: '/v2/courses/category',
        token: that.cookies
    }, req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(error, body != "" ? JSON.parse(body) : body);
        }
    })

}

module.exports = Router;