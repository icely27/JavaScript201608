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
	var current=this.offsetLeft+this.speed;
	var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
	if(current>=maxRight){
		this.style.left=maxRight+"px";
		this.speed*=-1;
	}else if(current<=0){
		this.style.left=0;
		this.speed*=-1;
	}else{
		this.style.left=this.offsetLeft+this.speed+"px";
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
	var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
	var current=this.offsetTop+this.dropSpeed;
	if(current>=maxBottom){
		this.style.top=maxBottom+"px";
		this.dropSpeed*=-1;
		this.flag++;
	}else{
		this.style.top=this.offsetTop+this.dropSpeed+"px";
		this.flag=0;
	}
	if(this.flag<2){
		this.dropTimer=window.setTimeout(processThis(drop,this),25);
	}
	
	
}

