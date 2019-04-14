// parse arguments to json 
// supported:
// - boolean, -V (false) -v (true)
// - default args
// - group args, -zxf
// - alias, @arg
const path = require('path')
const picoStr = require('pico-common').export('pico/str')
const beginner = 45
const PWD = ['password','passwd','pwd']

function alias(defaults, ret, key){
	const a=defaults[key]
	if (a && '@'===a[0]) ret[a.substr(1)]=ret[key]
}

function parse(key, args, i, ret){
	const t=key.charCodeAt(0)>96
	key=key.toLowerCase()
	const val=ret[key]
	if (void 0===val) return 0
	switch(typeof val){
	case 'boolean': ret[key]= t; break
	case 'string': ret[key]= args[++i]; break
	case 'number': ret[key]= parseFloat(args[++i]); break
	case 'object': try{
		ret[key]=JSON.parse(args[++i])
	}catch(e){
		return 0
	}
		break
	default: return 0
	}
	return i
}

module.exports = {
	parse(defaults, b){
		const ret= {}
		let val,j,c

		defaults= defaults || ret
		b= b || beginner

		for(let key in defaults){
			val=defaults[key][0]
			if ('@'===val){
				val=defaults[defaults[key].substr(1)][0]
			}
			ret[key]= val
		}

		let a
		error: {
			for(let i=2,args=process.argv; (a=args[i]); i++){
				if (a.length < 2) break error
				if (b !== a.charCodeAt(0)) break error
				if (b === a.charCodeAt(1)){
					i=parse(a.substr(2), args, i, ret)
					if (!i) break error
					alias(defaults, ret, a)
				}else{
					for(j=1,c; (c=a.charAt(j)); j++){
						i=parse(c, args, i, ret)
						if (!i) break error
						alias(defaults, ret, c)
					}
				}
			}
			return ret
		}
		return console.error('Invalid argument',a)
	},
	usage(defaults){
		console.log('Usage %s %s [arguments]',path.basename(process.argv[0]),process.argv[1])
		console.log('Arguments:')
		let val,param
		for(let key in defaults){
			val = defaults[key]
			param=key.length > 1 ? '--'+key : '-'+key
			if ('@'===val[0]){
				console.log('%s%s alias of "%s"',param,picoStr.tab(param,30,' '),val.substr(1))
			}else{
				console.log('%s%s %s [%s]',param,picoStr.tab(param,30,' '),val[1],val[0])
			}
		}
	},
	print(title, options){
		let	format='%s\n'
		const params=[title]

		for(var k in options){
			format+=' -%s%s %s\n'
			if (-1 === PWD.indexOf(k)) params.push(k, picoStr.tab(k,30,' '),JSON.stringify(options[k]))
			else params.push(k, picoStr.tab(k,30,' '),'*')
		}
		console.log(format, ...params)
	}
}
