var express = require('express'),
    router = express.Router(),
    Router = require('../utility/Router'),
    request = require('request'),
    cookieParser = require('cookie-parser'),
    utility = require('../utility/utility'),
    getData = require('../routers/api'),
    config = require('../../config');

// 首页
router.get('/', (req, res, next) => {
    var cookies = utility.JSONCookies(req.headers.cookie);
    new Router({
        api: {
            course: (callback) => {
                getData(cookies, req, callback, '/v2/courses')
            },
            footer: (callback) => {
                getData(cookies, req, callback, '/v2/content/page?tag=index')
            },
            checkLogin: (callback) => {
                callback(cookies.user ? JSON.parse(decodeURIComponent(cookies.user)) : false)
            }
        },
        renderPage: 'index'
    }).getRouter(req, res, next)
})

// 404
router.get('*', function(req, res) {
    res.render('errors/404', {
        title: 'No Found'
    })
});

module.exports = router