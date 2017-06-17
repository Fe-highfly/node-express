var express = require('express');
var router = express.Router();

router.get('/user', function(req, res, next) {
    res.render('common/foot');

})
module.exports = router;