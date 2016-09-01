

function down(e){//拖拽开始（拖拽的准备阶段），在鼠标按下去的时候执行
				//"selfdragstart"
				//on(ele,"selfdragstart",fn1);
				//本质就是创建了一个数组：ele["xxxx"+type].push(fn1);
	this.x=this.offsetLeft;
	this.y=this.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	if(this.setCapture){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);
	}else{
		var that=this;
		this.MOVE=function(e){move.call(that,e)}
		
		function processThis(fn,context){
			return function(e){fn.call(context,e);this};	
		}
		this.MOVE=processThis(move,this);
		this.UP=processThis(up,this);
		
		this.MOVE=move.bind(this);
		this.UP=up.bind(this);
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);
	}
	e.preventDefault();//用DOM2方法绑定的事件，必须用这个方法来阻止事件的默认行为
	selfRun.call(this,"selfdragstart",e);//通知，发布事件。也就是说表示down行为的事件类型是什么，是由selfRun在执行的时候的第一个参数决定的
}

function move(e){//拖拽进行，在鼠标按下去、并且鼠标移动的时候执行
		//事件类型叫“selfdragging”
	this.style.left=this.x+(e.pageX-this.mx)+"px";
	this.style.top=this.y+(e.pageY-this.my)+"px";
	selfRun.call(this,"selfdragging",e)
}

function up(e){//拖拽结束，在鼠标抬起来的时候，结束拖拽
	//事件类型叫"selfdragend"
	if(this.releaseCapture){
		this.releaseCapture();
		off(this,"mousemove",move);
		off(this,"mouseup",up);
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);
	}
	selfRun.call(this,"selfdragend",e);
}
