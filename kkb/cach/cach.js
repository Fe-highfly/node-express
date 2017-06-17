// cache.js
const redis = require('redis');
const config = require('../config');
const logger = require('winston');

const redisObj = {
    client: null,
    connect: function() {
        this.client = redis.createClient(config.redis);
        this.client.on('error', function(err) {
            logger.error('redisCache Error ' + err);
        });
        this.client.on('ready', function() {
            logger.info('redisCache connection succeed');
        });
    },
    init: function() {
        this.connect(); // 创建连接
        const instance = this.client;

        // 主要重写了一下三个方法。可以根据需要定义。
        const get = instance.get;
        const set = instance.set;
        const setex = instance.setex;

        instance.set = function(key, value, callback) {
            if (value !== undefined) {
                set.call(instance, key, JSON.stringify(value), callback);
            }
        };

        instance.get = function(key, callback) {

            get.call(instance, key, (err, val) => {
                if (err) {
                    logger.warn('redis.get: ', key, err);
                }
                callback(null, JSON.parse(val));
            });

        };
        // 可以不用传递expires参数。在config文件里进行配置。
        instance.setex = function(key, value, callback) {
            if (value !== undefined) {
                setex.call(instance, key, config.cache.maxAge, JSON.stringify(value), callback);
            }
        };

        return instance;

    },
};

// 返回的是一个redis.client的实例
module.exports = redisObj.init();