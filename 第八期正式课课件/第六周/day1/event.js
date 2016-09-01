
(function(){
    //1.on 2.run 3.off 4.processThis
    function on(ele,type,fn){
        //分开自定义事件 my:"mywedding"和系统内置事件
        if(/^my/.test(type)){//自定义事件
            //1.创建自己事件池 2.把所有方法都放进事件池
            if(!ele['myEvent'+type]){
                ele['myEvent'+type]=[];
            }
            var a=ele['myEvent'+type];
            for(var i=0; i<a.length; i++){
                if(a[i]==fn) return;
            }
            a.push(fn);
        }else{
            //系统内置事件
            //1.处理浏览器兼容问题
            if(ele.addEventListener){//标准浏览器
                ele.addEventListener(type,fn,false);
                return;
            }
            //IE浏览器
            //2.创建一个自己的事件池
            if(!ele['onEvent'+type]){
                ele['onEvent'+type]=[];
                //避免重复绑定的问题
                ele.attachEvent('on'+type,function(){run.call(ele);});//解决this问题
                //因为在IE低级浏览器IE6~8中,在事件触发,执行该事件上的方法的时候,方法中的THIS是window;
                //标准浏览器中使用DOM2绑定的方法,在事件触发方法执行的时候,方法中的THIS都是当前的元素;但是在IE6~8下方法中的THIS是window;
            }
            var b=ele['onEvent'+type];
            for(var j=0; j<b.length; j++){
                if(b[j]==fn) return;
            }
            b.push(fn);
        }
    }
    //run方法只会在IE浏览器下执行;
    function run(){
        //这里的this都是ele;
        //注意这里run方法里的this,和on方法里的已经修改好了this的run方法相呼应;在那里,run方法已经被修改了this指向为那里的ele;
        var e=window.event;
        //拿到自己的事件池
        var type=e.type;
        //以下都是兼容处理,IE中本没有叫这些名字的属性,我们给他们加上自定属性名(让这些名字和标准浏览器中的名字一致,这样调用时就一致了);
        //noinspection JSAnnotator,JSValidateTypes
        e.target=e.srcElement;
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
        e.preventDefault=function(){e.returnValue=false;};
        e.stopPropagation=function(){e.cancelBubble=true;};

        var a=this['onEvent'+type];
        //这里的this都是ele,因为在on方法li,把run绑定给ele的'on'+type这个事件类型时,已经修改了run里的this为那个ele;
        //注意这里run方法里的this,和on方法里的已经修改好了this的run方法相呼应;在那里,run方法已经被修改了this指向为那里的ele;
        if(a && a.length){
            for(var i=0; i<a.length; i++){
                if(typeof a[i]=='function'){
                    a[i].call(this,e);//这里为什么要改成this呢?如果不改,单独调用a[i]这个方法时,它里面的this会是window吗?
                }else{
                    a.splice(i,1);
                    i--;
                }
            }
        }
    }
    //事件类型包括:系统事件类型和自定义事件类型;
    //某个事件类型(主行为)被触发了,绑定在该事件类型上的所有方法(辅行为)才被调用;
    //fire 方法决定自己定义的事件在哪里被触发;fire在哪里调用,哪里就是自定义事件的触发点;
    //系统事件有自己的触发点:即鼠标点击,划过,移动,拖动,离开,键盘点击等等事件,事件什么时候发生,什么时候就触发系统事件上绑定的那些方法;
    //而自定义事件的触发点,还要自己设置,即需要在哪里触发自定义事件,就把fire放在哪里,
    //fire方法和run方法原理相同,你也可以把fire这个方法起名叫做selfRun,就好理解了;
    //run方法的存在,是因为IE低级浏览器的执行顺序是乱序的,而标准浏览器中,浏览器自带的机制已经规定好事件是按顺序执行的;
    //我们的run方法其实也是模拟了标准浏览器中的,让绑定的事件按照顺序执行的那个内置的机制;模拟标准浏览器按顺序执行的那个内置方法;
    function fire(ele,type,e){
        //1.取自己事件池 2.执行事件池中的每个方法；
        var a=ele['myEvent'+type];
        //自己的自定义事件类型,放在ele上的自定义属性ele['myEvent'+type]上;
        //系统事件类型,放在ele上的自定义属性ele['onEvent'+type]上;
        //注意区分,这两个属性是不同的名字,它们存的数据都是数组类型的,分别存放自定义事件,和系统事件;
        if(a && a.length){
            for(var i=0; i<a.length; i++){
                if(typeof a[i]=='function'){
                    if(e==undefined){
                        a[i].call(ele);
                    }else{
                        a[i].call(ele,e);
                    }
                }else{
                    a.splice(i,1);
                    i--;//防止数组塌陷；
                }
            }
        }
    }
    function off(ele,type,fn){
        if(/^my/.test(type)){//解绑自定义事件
            //1.取自己的事件池 2.谁==fn，让谁=null;
            var a=ele['myEvent'+type];
            if(a && a.length){
                for(var i=0; i<a.length; i++){
                    if(a[i]==fn){
                        a[i]=null;
                        return;
                    }
                }
            }
        }else{//解绑系统事件
            if(ele.removeEventListener){
                ele.removeEventListener(type,fn,false);
            }else{//IE浏览器下：解除事件绑定，只能解除自己事件池中的；
                var b=ele['onEvent'+type];
                if(b && b.length){
                    for(var j=0; j<b.length; j++){
                        if(b[j]==fn){
                            b[j]=null;
                            return; //break
                        }
                    }
                }
            }
        }
    }
    function processThis(fn,obj){
        return function(e){
            if(e==undefined){
                fn.call(obj);
                return;
            }
            fn.call(obj,e);
            // console.log(this);//
            //一个函数在没有执行的时候是没有this的,只是存在内存空间,执行的时候才有上下文才有this,才能知道this是谁;
        }
    }
    window.$event={
        on : on,
        off : off,
        fire : fire,
        processThis : processThis
    }
})();