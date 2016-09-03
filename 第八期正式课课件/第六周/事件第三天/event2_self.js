//我们写的event.js是基于DOM对象的，ele是承载所有行为的主体，ele是上下文

//原来的event.js事件库，主要是处理浏览器的系统事件的，这样容易造成误解：就会认为，一提到事件，就是DOM元素有关系，一提到事件就是click,mousemove,mousedown
//事件这个东西，未必和DOM元素有关系。每种对象上的行为，都可以发布事件
//从而彻底的理解事件的原理是什么

//事件是对接两个不同行为的管理模式
//行为---谁谁的行为（行为有了一个承载的主体，这是面向对象的观念 ），原来说过的那些事件，都和DOM元素有关。
//它不但是DOM元素有关，还是可以和其它的对象有关

//我们这儿的解决方案（这里的代码），只是为DOM元素的、解决浏览器事件兼容性的方案。它只能解决浏览器的事件兼容性总题，即使是发布自定义事件，也是只能给DOM元素发布自定义事件，对于非DOM对象则无能为力

//现在是还要可以给我们自己定义的类，也让它们具备事件发布和事件管理的功能：把这个类的行为和其它行为对接的功能

function on(ele,type,fn){
	if(/^self/.test(type)){
		if(!ele["selfEvent"+type]){
			ele["selfEvent"+type]=[];	
		}
		var a=ele["selfEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
	}else if(ele.addEventListener)
		ele.addEventListener(type,fn,false);
		
	else{
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


//新定义一个selfRun方法，专门处理自定义事件的“通知”
//它负责当主行为发生的时候，遍历on的时候保存在对应的数组里的方法并且执行
function selfRun(selfType,e){//selfType是指的约定好的自定义事件类型;第二个参数e是系统的事件对象，是可选参数
	var a=this["selfEvent"+selfType];
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
	if(/^self/.test(type)){
		var a=ele["selfEvent"+type];
		if(a&&a.length){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn){
					a[i]=null;
					break;	
				}
			}
		}
	}else
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
			return function(e){fn.call(context,e);this};	
		}