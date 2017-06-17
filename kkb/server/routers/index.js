var index = require('../controller/index'),
    courseDetails = require('../controller/course_details'),
    list = require('../controller/list'),
    user = require('../controller/user'),
    pay = require('../controller/pay'),
    Router = require('../utility/Router'),
    log = require('../utility/logHelper'),
    express = require('express'),
    app = express();

module.exports = function(app) {
    log.use(app)
    app.use('/user', user);
    app.use('/list', list);
    app.use('/course', courseDetails);
    app.use('/pay', pay)
    app.use('/', index);
    // app.user('/pay', pay);
}