var observer = (function(t){
    var __message = {};
    return {
        register:function(type,fn){
            if(typeof __message[type] === 'undefined'){
                __message[type] = [fn];
            }else{
                __message[type].push(fn);
            }
        },
        fire:function(type,args){
            if(!__message[type]){
                throw new Error('unregister type');
                return;
            }
            var events = {
                type:type,
                args:args || {},
            };
            var len = __message[type].length;
            for(var i = 0;i<len;i++){
                __message[type][i].call(this,events);
            }
        },
        remove:function(type,fn){
            if(__message[type] instanceof Array){
                var i = __message[type].length - 1;
                for(;i>=0;i--){
                    __message[type][i] === fn && __message[type].slice(i,1);
                }
            }
        },
    };

})();

