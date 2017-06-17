var ua = require('mobile-agent'),
    config = require('../../config');


var utility = {
    JSONCookies: function(obj) {
        var cookies = {};
        obj && obj.split(';').forEach(function(Cookie) {
            var parts = Cookie.split('=');
            cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
        // cookies = JSON.stringify(cookies) != "{}" ? JSON.parse(cookies) : cookies;
        return cookies
    },
    JSONCookie: function(str) {
        if (!str || str.substr(0, 2) !== 'j:') return; //判断是否为JSON字符序列，如果不是返回undefined

        try {
            return JSON.parse(str.slice(2)); //解析JSON字符序列
        } catch (err) {
            // no op
        }
    },
    responseHeaders: //请求参数的头部信息
        function(obj, req) {

        return options = {
            url: 'http://' + config.host + obj.url,
            method: obj.method || 'get',
            headers: {
                Platform: 'www',
                XAuthToken: obj.token,
                agent: ua(req.headers['user-agent']) ? true : false // true代表m, false代表pc
            }
        }
    },
    getData: function(cookies, req, callback, url) {
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
}
module.exports = utility;