/**
 * Created by icely on 16/9/1.
 */
function creaseIndex(){
    this.style.zIndex =++zIndex;
}
function getSpeedx(e){//获取横向的速度-放在move接口里
    if(!this.prevx){
        this.prevx= e.clientX;
    }else{
        this.speedx= e.clientX-this.prevx;
        this.prevx= e.clientX;
    }
}
function fly(){
    clearTimeout(this.flyTimer);
    //给横向速度加摩擦和边界限制；
    this.speedx*=.93; //摩擦
    var l=this.offsetLeft+this.speedx;
    var maxl=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
    if(l>=maxl){
        l=maxl;
        this.speedx*=-1;
    }else if(l<=0){
        l=0;
        this.speedx*=-1;
    }
    if(Math.abs(this.speedx)>=0.5){
        //同理top的设定:当满足这个条件时,才给left赋值,
        // 再开启定时器,每隔一段事件调用自身这个方法一次;
        //当< 0.5时,元素就
        this.style.left=l+'px';//这句话写在那里啊?
        this.flyTimer=setTimeout($event.processThis(arguments.callee,this),30)
    }
}
function drop(){
    clearTimeout(this.dropTimer);
    if(!this.speedy){
        this.speedy=g;
    }else{
        this.speedy+=g;
    }
    this.speedy*=.93; //摩擦
    var t=this.offsetTop+this.speedy;
    var maxt=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    if(t>=maxt){
        t=maxt;
        this.speedy*=-1;
        flg++;//只触底，不走正常，说明已经停止运动
    }else{
        flg=0;
    }
    if(flg<2){
        //当这flg大于等于2的时候说明已经触底很多次,那就不用给当前的top赋值了,
        // 也不用再每隔一段时间去调用这个drop方法了,flag>=2时什么都不用做,不符合这个判断条件
        //也就是说在flag>=2时,drop方法执行时进不了判断语句,相当于进了这个方法啥也没做就出来了;
        //因为上面的一堆代码都只是在给t赋值,而最后这句才是改变元素top的值为t;
        this.style.top=t+'px';
        this.dropTimer=setTimeout($event.processThis(arguments.callee,this),30);
    }
}
function getMove(){
    fly.call(this);//注意这里的写法,千万别写成fly().call(this);
    drop.call(this);//call就会立即调用了,你前面调用后再call是啥意思咩!?什么鬼bug,谁写的
}
function stopMove(){
    clearTimeout(this.flyTimer);
    clearTimeout(this.dropTimer);
}