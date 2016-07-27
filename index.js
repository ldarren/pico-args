// parse arguments to json 
// supported:
// - boolean, -V (false) -v (true)
// - default args
// - group args, -zxf
// - alias
var
path= require('path'),
picoStr= require('pico').export('pico/str'),
beginner= 45,
alias= function(defaults, ret, key){
    var a=defaults[key]
    if ('@'===a[0]) ret[a.substr(1)]=ret[key]
},
parse=function(key, args, i, ret){
	var t=key.charCodeAt(0)>96
	key=key.toLowerCase()
	var val=ret[key]
	if (undefined===val) return 0
	switch(typeof val){
	case 'boolean': ret[key]= t; break
	case 'string': ret[key]= args[++i]; break
	case 'number': ret[key]= parseFloat(args[++i]); break
	case 'object': ret[key]= try{JSON.parse(args[++i])}catch(e){return 0} break
	default: return 0
	}
	return i
}

module.exports= {
    parse: function(defaults, b){
        var ret= {},val,j,c,t

        defaults= defaults || ret
        b= b || beginner

        for(var key in defaults){
            val=defaults[key][0]
            if ('@'===val){
                val=defaults[defaults[key].substr(1)][0]
            }
            ret[key]= val
        }

        error: {
            for(var i=2,args=process.argv,a; a=args[i]; i++){
                if (a.length < 2) break error
                if (b !== a.charCodeAt(0)) break error
                if (b === a.charCodeAt(1)){
					i=parse(a.substr(2), args, i, ret)
					if (!i) break error
                    alias(defaults, ret, a)
                }else{
                    for(j=1,c; c=a.charAt(j); j++){
						i=parse(c, args, i, ret)
						if (!i) break error
						alias(defaults, ret, a)
                    }
                }
            }
            return ret
        }
        return console.error('Invalid argument',a)
    },
    usage: function(defaults){
        console.log('Usage %s %s [arguments]',path.basename(process.argv[0]),process.argv[1])
        console.log('Arguments:')
        var val,param
        for(var key in defaults){
            val = defaults[key]
            param=key.length > 1 ? '--'+key : '-'+key
            if ('@'===val[0]){
                console.log('%s%s alias of "%s"',param,picoStr.tab(param,30,' '),val.substr(1))
            }else{
                console.log('%s%s %s [%s]',param,picoStr.tab(param,30,' '),val[1],val[0])
            }
        }
    },
    print: function(title, options){
        var
        format='%s\n',
        pwd=['password','passwd','pwd'],
        params=[title]

        for(var k in options){
            format+=' -%s%s %s\n'
            if (-1 === pwd.indexOf(k)) params.push(k, picoStr.tab(k,30,' '),JSON.stringify(options[k]))
            else params.push(k, picoStr.tab(k,30,' '),'*')
        }
        console.log(format, ...params)
    }
}
