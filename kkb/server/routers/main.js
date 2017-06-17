var express = require('express'),
    routes = express.Router(),
    request = require('request'),
    config = require('../../config');



routes.get('/', function(req, res, next) {
    console.log('http://' + config.host + "/v2/study/5/topic")
    request('http://' + config.host + "/v2/study/5/topic", function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(config)
                console.log(body);
                res.render('index', {
                    title: body
                })
            } else {
                console.log(error)
                res.render('index', {
                    title: body
                })
            }

        })
        // res.render('index', {
        //     title: "body"
        // })

})
module.exports = routes;