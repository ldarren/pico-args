var
pico=require('pico-common'),
test= pico.export('pico/test'),
ensure= test.ensure,
args=require('./index')

console.log(process.argv)

ensure('ensure parse works', (cb)=>{
	var defaults={
		proj:['','project name'],
		p:'@proj',
		env:['pro','environment: dev, st or pro'],
		wd:['.','working directory'],
		mod:['mod','path to module directory'],
		cfg:['cfg','path to configuration directory'],
		bin:['bin','path to binary/output directory'],
		entry:['main.js','entry point filename'],
		underscore:[true,'embed underscore library'],
		backbone:[true,'embed backbone library'],
		lean:[true,'embed lean library'],
		pico:[true,'embed pico library']
	}
	cb(null, !!args.parse(defaults))
})
ensure('ensure default overriden, run test with npm test -- --proj XXX', (cb)=>{
	var
	dp=`proj${Date.now()}`
	defaults={
		proj:[dp,'project name'],
		p:'@proj'
	},
	opts=args.parse(defaults)
	cb(null, opts.proj)
})
ensure('ensure alias works, run test with npm test -- -p XXX', (cb)=>{
	var
	defaults={
		proj:['','project name'],
		p:'@proj'
	},
	opts=args.parse(defaults)
	cb(null, opts.proj)
})
