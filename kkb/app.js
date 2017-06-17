/**
 * Created by Fei on 2017/04/12.
 * 应用程序的启动（入口）文件
 */
var express = require('express'),
    //加载模板处理模块
    swig = require('swig'),
    config = require('./config'),
    path = require('path'),
    log4js = require('log4js'),
    logger = require("./server/utility/logHelper").helper,
    log = require('./server/utility/logHelper'),
    app = express();

let compression = require('compression'),
    serveStatic = require('serve-static');

logger.writeInfo("哈哈1开始记录日志");
logger.writeErr("出错了，你怎么搞的");
global.app = app;
// 中间件处理
app.use(compression());
//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
//设置静态文件托管
let viewFolder = __dirname;

if (process.env.NODE_ENV === 'development') {
    console.log('gaofei')
    viewFolder += "/views";
    app.use(express.static(__dirname + '/client', { maxAge: 1000 * 60 * 60 }));
    swig.setDefaults({ cache: false })
} else {
    app.use(express.static(__dirname + '/public', { maxAge: 1000 * 60 * 60 }));
    viewFolder += "/public/views";
    // app.set('view cache', true);
    // swig.setDefaults({ cache: true })

}

require('./server/routers')(app);
app.set('views', viewFolder);

app.listen(3030);


process.on('SIGINT', function() {
    log.error('程序重启触发');
    process.exit(0);
});