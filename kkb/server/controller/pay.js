var express = require('express'),
    router = express.Router(),
    request = require('request'),
    cookieParser = require('cookie-parser'),
    utility = require('../utility/utility'),
    config = require('../../config');

// 首页
router.get('/', function(req, res, next) {
    var cookies = utility.JSONCookies(req.headers.cookie);
    console.log(decodeURIComponent(cookies.user));
    request(utility.responseHeaders({
        url: '/v2/courses',
        token: cookies
    }, req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render('page/pay', {
                course: body != "" ? JSON.parse(body) : body,
                checkLogin: cookies.user ? JSON.parse(decodeURIComponent(cookies.user)) : false,
            })
        } else {
            console.log(error);
            res.render('errors/404', {
                course: body
            })
        }
    })
})
router.get('*', function(req, res) {
    res.render('errors/404', {
        title: 'No Found'
    })
});

module.exports = router