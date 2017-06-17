var express = require('express'),
    router = express.Router(),
    request = require('request'),
    cookieParser = require('cookie-parser'),
    utility = require('../utility/utility'),
    config = require('../../config');

// 首页
router.get('/:courseId', function(req, res, next) {
    var cookies = utility.JSONCookies(req.headers.cookie);
    var courseId = req.params.courseId;
    console.log(decodeURIComponent(cookies.user));
    console.log(req.params.courseId)
    request(utility.responseHeaders({
        url: '/v2/courses/' + courseId,
        //token: cookies
    }, req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render('page/course_details', {
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


// 404
router.get('*', function(req, res) {
    res.render('errors/404', {
        title: 'No Found'
    })
});

module.exports = router