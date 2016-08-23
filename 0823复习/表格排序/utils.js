/**
 * Created by icely on 16/8/10.
 */
var utils = (function(){
    return{

        makeArray:function(arg){
            var ary=[];
            try{
                ary=Array.prototype.slice.call(arg);
            }catch(e){
                for(var i=0;i<arg.length;i++){
                    ary.push(arg[i]);
                }
            }
            return ary;
        },
        jsonParse: function(str){
            return 'JSON' in window ? JSON.parse(str):eval('('+str+')');
        }

    }
})()