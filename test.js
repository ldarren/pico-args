const pico = require('pico-common/bin/pico-cli')
const {test} = pico.export('pico/test')
const args = require('./index')

console.log(process.argv)

test('ensure parse works', (cb)=>{
	const defaults={
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
test('ensure default overriden, run test with npm test -- --proj hello', (cb)=>{
	const dp=`proj${Date.now()}`
	const defaults={
		proj:[dp,'project name'],
		p:'@proj'
	}
	const opts=args.parse(defaults)
	cb(null, 'hello' === opts.proj)
})
test('ensure alias works, run test with npm test -- -p hello', (cb)=>{
	const defaults={
		proj:['','project name'],
		p:'@proj'
	}
	const opts=args.parse(defaults)
	cb(null, 'hello' === opts.proj)
})
