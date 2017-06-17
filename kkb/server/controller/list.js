var express = require('express'),
    Router = require('../utility/Router'),
    router = express.Router(),
    request = require('request').defaults({
        pool: { maxSockets: 5000 }
    }),
    cookieParser = require('cookie-parser'),
    utility = require('../utility/utility'),
    getData = require('../routers/api'),
    async = require('async'),
    config = require('../../config'),

    redis_client = require('redis').createClient(config.redis.port, config.redis.host, config.redis.opt)

function cache_redis(req, res, next, redis_key) {
    redis_client.get(redis_key, (err, data) => {
        if (!err) {

        }
        if (data != null) {

        } else {
            return next(data)
        }
    })
}

router.get('/',
    (req, res, next) => {
        cache_redis(req, res, next, 'redis_key')
    },
    (req, res, next) => {
        var cookies = utility.JSONCookies(req.headers.cookie)
        new Router({
            api: {
                listnav: function(callback) {
                    getData(cookies, req, callback, '/v2/courses/category')
                },
                categoryCourse: function(callback) {
                    getData(cookies, req, callback, '/v2/courses?category')
                }
            },
            renderPage: "page/course_list"
        }).getRouter(req, res, next)
    });




router.get('/:courseid', (req, res, next) => {
    var cookies = utility.JSONCookies(req.headers.cookie);
    new Router({
        api: {
            listnav: function(callback) {
                getData(cookies, req, callback, '/v2/courses/category')
            },
            categoryCourse: function(callback) {
                getData(cookies, req, callback, '/v2/courses?category=' + encodeURI(req.params.courseid))
            }
        },
        renderPage: "page/course_list"
    }, req).getRouter(req, res, next)
})

module.exports = router;