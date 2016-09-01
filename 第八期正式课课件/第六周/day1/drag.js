/**
 * Created by icely on 16/8/31.
 */
var aDiv = document.getElementsByTagName('div');
for(var i = 0;i<aDiv.length;i++){
    var ele = aDiv.item(i);//注意这种写法,item是指每一项,index是索引,索引为i的那一项内容item
    //var ele = aDiv[i];
    $event.on(ele,'mousedown',down);
}
function down(e){
    this.x = this.offsetLeft;
    this.y = this.offsetTop;
    this.mx = e.clientX;
    this.my = e.clientY;
    if(this.setCapture){
        this.setCapture();
        $event.on(this,'mousemove',move);
        $event.on(this,'mouseup',up);
    }else{
        this.MOVE = $event.processThis(move,this);
        this.UP = $event.processThis(up,this);
        $event.on(document,'mousemove',this.MOVE);
        $event.on(document,'mouseup',this.UP);
    }
    e.preventDefault ? e.preventDefault():e.returnValue = false;
}
function move(e){
    this.style.left = this.x +(e.clientX-this.mx)+'px';
    this.style.top = this.y +(e.clientY-this.my)+'px';
}
function up(e){
    if(this.releaseCapture){
        this.releaseCapture();
        $event.off(this,'mousemove',move);
        $event.off(this,'mouseup',up);
    }else{
        $event.off(document,'mousemove',this.MOVE);
        $event.off(document,'mouseup',this.UP);
    }
}