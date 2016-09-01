function on(ele,type,fn){
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		
	}else{
		if(!ele["onEvent"+type]){
			ele["onEvent"+type]=[];	
			ele.attachEvent("on"+type,function(){run.call(ele)});
		}
		var a=ele["onEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;
		}
		
		a.push(fn);
	}

}


function run(){
	var e=window.event;
	var type=e.type;

	//noinspection JSAnnotator,JSAnnotator
	e.target=e.srcElement;
	e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
	e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
	e.preventDefault=function(){e.returnValue=false;}
	e.stopPropagation=function(){e.cancelBubble=true;}
	
	var a=this["onEvent"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);	
			}else{
				a.splice(i,1);
				i--;	
			}
		}
	}
	
}

function off(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
	}else{
		var a=ele["onEvent"+type];
		if(a&&a.length){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn){
					a[i]=null;
					return;	
				}
			}
		}
	}
}


function processThis(fn,context){
			return function(e){fn.call(context,e);};
		}