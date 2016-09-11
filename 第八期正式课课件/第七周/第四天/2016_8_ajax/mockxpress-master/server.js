/**
 * Created by yataozhang on 8/22/16.
 */
var path = require('path');
var bodyParser = require('./thirdMiddleware/body-parser');
var express = require('./express');
// 启动express
var app = express();

// 设置静态资源路径
app.use(express.static(path.join(__dirname, '../ajax/bottle')));
app.use('/throwBottle', bodyParser());
// 捡瓶子
app.get('/getBottle', function (req, res) {
    res.send('捡瓶子接口');
});
app.get('/throwBottle', function (req, res) {
    res.send('禁止通过get方法访问该接口');
});

// 扔瓶子

app.post('/throwBottle', function (req, res) {
    console.log(req.body);
    res.send({error:0});
});

// 监听端口
app.listen(3000);