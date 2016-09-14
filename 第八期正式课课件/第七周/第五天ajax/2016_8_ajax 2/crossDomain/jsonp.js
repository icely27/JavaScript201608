/**
 * Created by 银鹏 on 2016/9/11.
 */
(function () {
    /**
     * jsonp请求
     * @param {string} url jsonp接口地址
     * @param {*} data 发送的参数
     * @param {string} jsonpcallback
     * @param {Function} callback 回调函数
     */
    function jsonp(url, data, jsonpcallback, callback) {
        // 为了防止缓存 每次cbName都累加
        var cbName = 'cb' + counter++;
        // 生成全局函数名
        var globalName = 'window.jsonp.' + cbName;

        // 定义全局函数体
        window.jsonp[cbName] = function (data) {
            try {
                callback(data);
            } finally {
                complete();
            }
        };

        // 将data拼接到url中
        data = encode(data);
        // data有值
        if (data) {
            url = url + (/\?/.test(url) ? '&' : '?') + data;
        }
        // 将jsonpcallback和全局函数名 拼接到url中
        url = url + (/\?/.test(url) ? '&' : '?') + jsonpcallback + '=' + globalName;

        // 动态生成script 发起请求
        var script = document.createElement('script');
        script.src = url;
        // 当请求加载失败时
        script.onerror = function () {
            complete();
        };

        // 加载完成之后删除script和全局函数
        function complete() {
            script.parentNode.removeChild(script);
            delete window.jsonp[cbName];
        }

        // 将script拼接到body中时先判断body是否已经加载完成,否则会报错
        if (document.readyState !== 'loading') {
            document.body.appendChild(script);
        } else {
            if (window.addEventListener) {
                window.addEventListener('load', function () {
                    document.body.appendChild(script);
                }, false)
            } else {
                window.attachEvent('onload', function () {
                    document.body.appendChild(script);
                });
            }
        }
    }

    /**
     * 将data格式化为请求参数的格式
     * @param data
     */
    function encode(data) {
        if (typeof  data === 'string') {
            return data;
        }
        if (typeof  data === 'undefined') {
            return '';
        }
        if (Object.prototype.toString.call(data) === '[object Object]') {
            var arr = [];
            for (var n in data) {
                if (!data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
            }
            return arr.join('&');
        }
        return data.toString();
    }

    // 用来计数
    var counter = 1;

    this.jsonp = jsonp;
})();