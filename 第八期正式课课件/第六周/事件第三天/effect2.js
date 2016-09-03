function clearEffect(){
	clearTimeout(this.flyTimer);
	clearTimeout(this.dropTimer);	
}

function getSpeed(e){//getSpeed方法里的e，是几手的e，就是从那几个方法里，最终传到这儿来的
	if(this.prevPosi){
		this.speed=e.pageX-this.prevPosi;
		this.prevPosi=e.pageX;
		
	}else{
		this.prevPosi=e.pageX;	
	}	
}

function fly(){
	
	this.speed*=.97;
	var current=this.ele.offsetLeft+this.speed;
	var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.ele.offsetWidth;
	if(current>=maxRight){
		this.ele.style.left=maxRight+"px";
		this.speed*=-1;
	}else if(current<=0){
		this.ele.style.left=0;
		this.speed*=-1;
	}else{
		this.ele.style.left=this.ele.offsetLeft+this.speed+"px";
	}
	
	if(Math.abs(this.speed)>=.5){
		this.flyTimer=window.setTimeout(processThis(fly,this),20);
	}
	
}

function drop(){
	if(this.dropSpeed){
		this.dropSpeed+=9;
	}else{
		this.dropSpeed=9;
	}
	this.dropSpeed*=.98;
	var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.ele.offsetHeight;
	var current=this.ele.offsetTop+this.dropSpeed;
	if(current>=maxBottom){
		this.ele.style.top=maxBottom+"px";
		this.dropSpeed*=-1;
		this.flag++;
	}else{
		this.ele.style.top=this.ele.offsetTop+this.dropSpeed+"px";
		this.flag=0;
	}
	if(this.flag<2){
		this.dropTimer=window.setTimeout(processThis(drop,this),25);
	}
	
	
}

