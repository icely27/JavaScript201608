/**
 * Created by yataozhang on 8/22/16.
 */
var path = require('path');
var bodyParser = require('./thirdMiddleware/body-parser');
var express = require('./express');
// 启动express
var app = express();
var bottleList = [];
// 设置静态资源路径
app.use(express.static(path.join(__dirname, '../ajax/bottle')));
app.use('/throwBottle', bodyParser());
// 捡瓶子
app.get('/getBottle', function (req, res) {
    var len = bottleList.length;
    var index = Math.floor(Math.random() * len);
    res.send(bottleList[index] || '没有瓶子');
});
app.get('/throwBottle', function (req, res) {
    res.send('禁止通过get方法访问该接口');
});

app.get('/crossDomain', function (req, res) {
    // 获取请求参数中的name
    var name = req.query.name;
    //var randomVal = '_' + Math.random().toString(36).slice(2, 9);
    //res.send('var ' + name + '="hello world"');
    res.send(name + '("hello world")');
    //=>aaa("hello world")
});

app.get('/cors', function (req, res) {
    //res.headers('Access-Control-Allow-Origin','*');
    res.headers('Access-Control-Allow-Origin','http://localhost:63342');
    res.headers('Access-Control-Allow-Credentials','true');
    res.send('hello cors');
});
// 扔瓶子

app.post('/throwBottle', function (req, res) {
    bottleList.push(req.body);
    res.send('');
});

// 监听端口
app.listen(3000);