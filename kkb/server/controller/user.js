var express = require('express'),
    router = express.Router(),
    request = require('request'),
    cookieParser = require('cookie-parser'),
    utility = require('../utility/utility'),
    config = require('../../config');

// 首页 /v2/users/logout
router.get('/logout', function(req, res, next) {
    uc2login.test.kaikeba.com
    request('http')
    request(utility.responseHeaders({
        method: 'post',
        url: "/v2/users/logout"
    }, req), function(error, response, body) {
        console.log(body + 'dasd ')
        if (!error && response.statusCode == 200) {
            //res.send('ada')
        }

        res.redirect('/');
    })



})

// 课程列表
router.get('/:courseClass', function(req, res, next) {
    request(utility.responseHeaders({
        url: "2"
    }, req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render('index', {
                course: JSON.parse(body)
            })
        } else {
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