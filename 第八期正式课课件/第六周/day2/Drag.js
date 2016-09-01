/**
 * Created by icely on 16/9/1.
 */
/*面向对象的设计模式封装,构造函数的封装*/
//正式开始写:拖拽产品1.0 版,以后还有升级
function Drag(ele){
    this.ele = ele;
    /*//console.log(this.ele);
     //传入的参数ele在prototype上访问不到,所以我们把参数保存在自定义属性上,私有变量转为自定义属性后,以后在别的地方就可以用了;
     //其实以下这四个赋值可以不写,但是一般大家都这么写;
     //例如,过年大家都穿红色的衣服,大家普遍都这么做,我们也这么写*/
    this.x = null;
    this.y = null;
    this.mx = null;
    this.my = null;
    this.DOWN = processThis(this.down,this);
    this.MOVE = processThis(this.move,this);
    this.UP = processThis(this.up,this);
    on(ele,'mousedown',this.DOWN);
    /*//哦耶!终于找到啦!别忘了这里要用改好this后的大MOVE哦,this.DOWN;用this.down会报错找不到down里面的this.ele*/
}
//这里是通过this去找到down这个方法,这里是定义,不是调用,只是说明这里给事件mousedown绑定的这个方法
//这里的this是指实例,实例上的down方法,它所属的类Drag上没有down方法,就去它所属类的原型Drag.prototype上去找,
// 在原型上有这个方法Drag.prototype.down;
/*
 * 属性分为很多种:  JS中的原生的有四种属性,
 * 有的 可读也可以写:例如自定义的属性,能读也能改写;
 * 有的 可读不可写,例如系统自带的属性,ele.click,只能读,但是不能改写它内部的具体方法,
 *               不能改写click这个属性的本身特征,例如我们不能删除系统自带的属性,但是可以删除自己增加的自定义属性;
 * 有的 不可读也不可写,例如private,私有的只有后台开发人员能看到能改写,用户无法读到更不能改写;
 * 有的 不可枚举,不能遍用for in 循环遍历到的属性,
 * */
//document.body.offsetParent == null;
//document.body.offsetparent == undefined;
Drag.prototype.down = function(e){
    /*console.log(this.ele);*/
    this.x = this.ele.offsetLeft;
    this.y = this.ele.offsetTop;
    this.mx = e.pageX;
    this.my = e.pageY;
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,'mousemove',this.MOVE);
        on(this.ele,'mouseup',this.UP);
    }else{
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
    }
    e.preventDefault();
};
Drag.prototype.move = function(e){
    this.ele.style.left = this.x + (e.pageX-this.mx)+'px';
    this.ele.style.top = this.y + (e.pageY-this.my)+'px';
};
Drag.prototype.up = function(){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,'mousemove',this.MOVE);
        off(this.ele,'mouseup',this.UP);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
};

/*当用new运算符去创建一个类的实例的时候,浏览器会做哪些事呢;
* 1.创建一个这个类的实例,并且返回;
* 2.实例通过__proto__,可以去共享使用构造函数的原型prototype上的方法和属性;
* 3.以这个实例为上下文,执行构造函数(一开始构造函数是个类名,现在它又是一个函数了)起初始化实例(配置环境的作用);
*
* */