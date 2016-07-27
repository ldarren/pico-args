var
pico=require('pico-common'),
test= pico.export('pico/test'),
ensure= test.ensure,
args=require('./index')

ensure('ensure parse working', (cb)=>{
	var defaults={
		proj:['','project name'],
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
