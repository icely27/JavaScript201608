/**
 * Created by ���� on 2016/9/11.
 */
(function () {
    /**
     * jsonp����
     * @param {string} url jsonp�ӿڵ�ַ
     * @param {*} data ���͵Ĳ���
     * @param {string} jsonpcallback
     * @param {Function} callback �ص�����
     */
    function jsonp(url, data, jsonpcallback, callback) {
        // Ϊ�˷�ֹ���� ÿ��cbName���ۼ�
        var cbName = 'cb' + counter++;
        // ����ȫ�ֺ�����
        var globalName = 'window.jsonp.' + cbName;

        // ����ȫ�ֺ�����
        window.jsonp[cbName] = function (data) {
            try {
                callback(data);
            } finally {
                complete();
            }
        };

        // ��dataƴ�ӵ�url��
        data = encode(data);
        // data��ֵ
        if (data) {
            url = url + (/\?/.test(url) ? '&' : '?') + data;
        }
        // ��jsonpcallback��ȫ�ֺ����� ƴ�ӵ�url��
        url = url + (/\?/.test(url) ? '&' : '?') + jsonpcallback + '=' + globalName;

        // ��̬����script ��������
        var script = document.createElement('script');
        script.src = url;
        // ���������ʧ��ʱ
        script.onerror = function () {
            complete();
        };

        // �������֮��ɾ��script��ȫ�ֺ���
        function complete() {
            script.parentNode.removeChild(script);
            delete window.jsonp[cbName];
        }

        // ��scriptƴ�ӵ�body��ʱ���ж�body�Ƿ��Ѿ��������,����ᱨ��
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
     * ��data��ʽ��Ϊ��������ĸ�ʽ
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

    // ��������
    var counter = 1;

    this.jsonp = jsonp;
})();