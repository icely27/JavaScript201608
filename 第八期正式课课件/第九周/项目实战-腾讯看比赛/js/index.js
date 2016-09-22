/*String.prototype*/
~function (pro) {
    //->解析URL中的问号参数值以及HASH值
    function queryURLParameter() {
        var obj = {},
            reg = /([^?=&#]+)=([^?=&#]+)/g;
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        reg = /#([^?=&#]+)/;
        if (reg.test(this)) {
            obj['HASH'] = reg.exec(this)[1];
        }
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);

/*计算CON BODY区域的高度*/
~function () {
    var fn = function () {
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        var conH = winH - 64 - 40;
        $('#conBody').css('height', conH);
        $('.menu').css('height', conH - 2);
    };
    fn();
    $(window).on('resize', fn);
}();

/*MENU*/
var menuRender = function () {
    var $menu = $('.menu'),
        $menuUL = $menu.children('ul'),
        menuScroll = null;

    //->发布订阅模式:创建一个计划$menuPlain.add()/$menuPlain.remove()
    var $menuPlain = $.Callbacks();

    //->BIND HTML
    $menuPlain.add(function (result) {
        $menuUL.html(ejs.render($('#menuTemplate').html(), {menuData: result}));
    });

    //->ISCROLL
    $menuPlain.add(function (result) {
        menuScroll = new IScroll('.menu', {
            scrollbars: true,
            fadeScrollbars: true,
            mouseWheel: true,
            bounce: false
        });
    });

    //->POSITION
    $menuPlain.add(function (result) {
        var obj = window.location.href.queryURLParameter(),
            hash = obj['HASH'] || 'nba';
        var $link = $menuUL.find('a'),
            $curLink = $link.filter("[href='#" + hash + "']");
        $curLink = $curLink.length === 0 ? $link.eq(0) : $curLink;
        $curLink.addClass('bg');
        menuScroll.scrollToElement($curLink[0], 300);
    });

    //->BIND EVENT
    $menuPlain.add(function (result) {
        var $link = $menuUL.find('a');
        $link.on('click', function () {
            $(this).addClass('bg').parent().siblings().children('a').removeClass('bg');
        });
    });

    return {
        init: function () {
            $.ajax({
                url: 'json/menu.json',
                type: 'GET',
                dataType: 'JSON',
                success: function (result) {
                    if (result) {
                        $menuPlain.fire(result);//->当数据获取成功后通知相关的方法依次执行,并且把获取的结果分别传递给每一个方法
                    }
                }
            });
        }
    }
}();
menuRender.init();







