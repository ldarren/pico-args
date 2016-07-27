#Pico Arguments Lib
Yet another barebone command line arguments library

##Usage
###defined default arguments
```javascript
var defaults={
	name: ['{DEFAULT_NAME}','{DESCRIPTION}'],
	n:'@name'
}
```
this is the default for
```
CMD --name xyz
```
or
```
CMD -n xyz
```
###data type
supported 4 datatypes: string, boolean, number and object/array
to set string type
```javascript
var defaults={
	str: ['default','default str is "default"'],
	s:'@str'
}
```
to set boolean type
```javascript
var defaults={
	bool: [false,'default bool is false'],
	b:'@bool'
}
```
set it to true
```
CMD -b # or CMD --bool
```
set it to false
```
CMD -B # or CMD --BOOL
```
to set number type
```javascript
var defaults={
	float: [0,'default float is 0'],
	f:'@float'
}
```
to set object type
```javascript
var defaults={
	obj: [{foo:"bar"},'default obj is {foo:"bar"}'],
	o:'@obj'
}
```
or
```javascript
var defaults={
	obj: [['foo','bar'],'default obj is ["foo","bar"]'],
	o:'@obj'
}
```
```
CMD -o '{"hello":"world"}' #or CMD --obj '{"hello":"world"}'
```
###parse arguments
```javascript
var
args=require('pico-args'),
options=args.parse(defaults)

console.log(options.name)
console.log(options.n)
```
###print arguments
this function requires pico-common module
```javascript
args.print('{TITLE}',options)
```
###print usage
this function requires pico-common module
```javascript
args.usage(defaults)
```
###argument combo
single character arguments can be string in one word
```javascript
var defaults={
	a:[true,'flag a'],
	b:[false,'flag b'],
	c:[true,'flag c'],
	d:['/opt/','path'']
}
```
```
CMD -Abcd '~/src'
```
